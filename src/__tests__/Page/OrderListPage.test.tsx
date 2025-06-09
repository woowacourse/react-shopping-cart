import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import OrderListPage from "../../pages/OrderListPage/OrderListPage";

import useCartItemList from "../../hooks/useCartItemList";
import { useErrorContext } from "../../contexts/ErrorContext";

vi.mock("../../hooks/useCartItemList");
vi.mock("../../contexts/ErrorContext");

vi.mock("../../components/OrderList/OrderListContent/OrderListContent", () => ({
  __esModule: true,
  default: () => <div data-testid="order-content" />,
}));
vi.mock("../../components/common/ErrorBox/ErrorBox", () => ({
  __esModule: true,
  default: () => <div data-testid="error-box" />,
}));
vi.mock("../../components/layout/Header/Header", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <header>{children}</header>
  ),
}));
vi.mock("../../components/layout/Header/BackButton", () => ({
  __esModule: true,
  default: () => <button data-testid="back-button">Back</button>,
}));

describe("OrderListPage", () => {
  const mockedUseCartItemList = vi.mocked(useCartItemList);
  const mockedUseErrorContext = vi.mocked(useErrorContext);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("로딩 중이면 '로딩중..' 텍스트를 보여준다", () => {
    mockedUseCartItemList.mockReturnValue({
      state: { isLoading: true },
      cartItemList: [],
    });
    mockedUseErrorContext.mockReturnValue({
      errorMessage: "",
      handleErrorMessage: function (value: string): void {
        throw new Error("Function not implemented.");
      },
    });

    render(<OrderListPage />);
    expect(screen.getByText("로딩중..")).toBeInTheDocument();
  });

  it("로딩이 끝나면 OrderListContent를 보여준다", () => {
    mockedUseCartItemList.mockReturnValue({
      state: { isLoading: false },
      cartItemList: [{ id: 1, quantity: 1, product: { price: 1000 } }],
    });
    mockedUseErrorContext.mockReturnValue({
      errorMessage: "",
      handleErrorMessage: function (value: string): void {
        throw new Error("Function not implemented.");
      },
    });

    render(<OrderListPage />);
    expect(screen.getByTestId("order-content")).toBeInTheDocument();
  });

  it("에러 메시지가 있으면 ErrorBox를 보여준다", () => {
    mockedUseCartItemList.mockReturnValue({
      state: { isLoading: false },
      cartItemList: [],
    });
    mockedUseErrorContext.mockReturnValue({
      errorMessage: "some error",
      handleErrorMessage: function (value: string): void {
        throw new Error("Function not implemented.");
      },
    });

    render(<OrderListPage />);
    expect(screen.getByTestId("error-box")).toBeInTheDocument();
  });
});
