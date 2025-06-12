import React from "react";
import { MemoryRouter } from "react-router";
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

  const mockSelectedCartItemList = [
    { id: 1, quantity: 2, isChecked: true },
    { id: 2, quantity: 1, isChecked: true },
  ];

  const renderWithRouter = (ui: React.ReactNode, state: any = {}) =>
    render(
      <MemoryRouter initialEntries={[{ pathname: "/order-check", state }]}>
        {ui}
      </MemoryRouter>
    );

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
      handleErrorMessage: vi.fn(),
    });

    renderWithRouter(<OrderListPage />, {
      selectedCartItemList: mockSelectedCartItemList,
    });

    expect(screen.getByText("로딩중..")).toBeInTheDocument();
  });

  it("로딩이 끝나면 OrderListContent를 보여준다", () => {
    mockedUseCartItemList.mockReturnValue({
      state: { isLoading: false },
      cartItemList: [{ id: 1, quantity: 2, product: { price: 1000 } }],
    });
    mockedUseErrorContext.mockReturnValue({
      errorMessage: "",
      handleErrorMessage: vi.fn(),
    });

    renderWithRouter(<OrderListPage />, {
      selectedCartItemList: mockSelectedCartItemList,
    });

    expect(screen.getByTestId("order-content")).toBeInTheDocument();
  });

  it("에러 메시지가 있으면 ErrorBox를 보여준다", () => {
    mockedUseCartItemList.mockReturnValue({
      state: { isLoading: false },
      cartItemList: [],
    });
    mockedUseErrorContext.mockReturnValue({
      errorMessage: "something went wrong",
      handleErrorMessage: vi.fn(),
    });

    renderWithRouter(<OrderListPage />, {
      selectedCartItemList: mockSelectedCartItemList,
    });

    expect(screen.getByTestId("error-box")).toBeInTheDocument();
  });
});
