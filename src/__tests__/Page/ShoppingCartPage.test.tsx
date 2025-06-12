import React from "react";
import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ShoppingCartPage from "../../pages/ShoppingCartPage/ShoppingCartPage";
import useCartItemList from "../../hooks/useCartItemList";

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

  // it("상품이 있으면 금액과 주문 버튼이 동작한다", () => {
  //   const mockedUseCartItemList = vi.mocked(useCartItemList);
  //   mockedUseCartItemList.mockReturnValue({
  //     state: { isLoading: false },
  //     cartItemList: [
  //       { id: 1, quantity: 2, product: { price: 10000 } },
  //       { id: 2, quantity: 1, product: { price: 20000 } },
  //     ],
  //     patchCartItem: vi.fn(),
  //     removeCartItem: vi.fn(),
  //   });

  //   render(<ShoppingCartPage />);

  //   expect(screen.getByText("SHOP")).toBeInTheDocument();
  //   expect(screen.getByText("40,000원")).toBeInTheDocument();
  //   expect(screen.getByText("3,000원")).toBeInTheDocument();
  //   expect(screen.getByText("43,000원")).toBeInTheDocument();

  //   fireEvent.click(screen.getByText("주문 확인"));
  //   const stored = JSON.parse(
  //     localStorage.getItem("selectedCartItems") || "[]"
  //   );
  //   expect(stored).toHaveLength(2);
  //   expect(mockNavigate).toHaveBeenCalledWith("/order-check", {
  //     state: {
  //       checkedProductsLength: 2,
  //       cartItemCheckListTotalQuantity: 3,
  //       totalPrice: 43000,
  //     },
  //   });
  // });

  beforeEach(() => {
    // localStorage 모킹 초기화
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem(key) {
          return store[key] || null;
        },
        setItem(key, value) {
          store[key] = String(value);
        },
        clear() {
          store = {};
        },
      };
    })();

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });

  it("상품이 있으면 금액과 주문 버튼이 동작한다", () => {
    const mockedUseCartItemList = vi.mocked(useCartItemList);
    mockedUseCartItemList.mockReturnValue({
      state: { isLoading: false },
      cartItemList: [
        { id: 1, quantity: 2, product: { price: 10000 } },
        { id: 2, quantity: 1, product: { price: 20000 } },
      ],
      patchCartItem: vi.fn(),
      removeCartItem: vi.fn(),
    });

    render(<ShoppingCartPage />);

    expect(screen.getByText("SHOP")).toBeInTheDocument();
    expect(screen.getByText("40,000원")).toBeInTheDocument();
    expect(screen.getByText("3,000원")).toBeInTheDocument();
    expect(screen.getByText("43,000원")).toBeInTheDocument();

    fireEvent.click(screen.getByText("주문 확인"));

    const stored = JSON.parse(
      localStorage.getItem("selectedCartItems") || "[]"
    );
    expect(stored).toHaveLength(2);
    expect(mockNavigate).toHaveBeenCalledWith("/order-check", {
      state: {
        checkedProductsLength: 2,
        cartItemCheckListTotalQuantity: 3,
        totalPrice: 43000,
      },
    });
  });
});
