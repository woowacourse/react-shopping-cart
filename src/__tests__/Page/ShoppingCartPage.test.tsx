import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ShoppingCartPage from "../../pages/ShoppingCartPage/ShoppingCartPage";
import useCartItemList from "../../hooks/useCartItemList";
import React from "react";

vi.mock("../../hooks/useCartItemList");

vi.mock("../../contexts/ErrorContext", () => ({
  __esModule: true,
  useErrorContext: () => ({ errorMessage: "" }),
}));
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

describe("ShoppingCartPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("로딩 중이면 '로딩중..' 텍스트를 보여준다", () => {
    const mockedUseCartItemList = vi.mocked(useCartItemList);
    mockedUseCartItemList.mockReturnValue({
      state: {
        isLoading: true,
        isFetching: false,
        isSuccess: false,
        isFail: false,
      },
      cartItemList: [],
      patchCartItem: vi.fn(),
      deleteCartItem: vi.fn(),
    });

    render(<ShoppingCartPage />);
    expect(screen.getByText("로딩중..")).toBeInTheDocument();
  });
});
