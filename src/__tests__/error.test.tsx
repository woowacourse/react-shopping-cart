import { act, fireEvent, render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { deleteCartItem } from "../domains/cart/apis/deleteCartItem";
import { getCartItems } from "../domains/cart/apis/getCartItems";
import { patchCartItem } from "../domains/cart/apis/patchCartItem";
import { CartProvider } from "../domains/cart/contexts/CartContext";
import { getCoupons } from "../domains/coupon/apis/getCoupons";
import { CouponProvider } from "../domains/coupon/contexts/CouponContext";
import { OrderProvider } from "../domains/order/contexts/OrderContext";
import { ModalProvider } from "../features/modal/ModalContext";
import { ToastProvider } from "../features/toast/ToastContext";
import CartPage from "../pages/CartPage/CartPage";
import OrderPage from "../pages/OrderPage/OrderPage";

jest.mock("../apis/httpClient", () => ({
  API_KEY: "mock-api-key",
}));
jest.mock("../apis/config", () => ({
  API_BASE_URL: "http://mock-api-url.com",
  CLIENT_BASE_PATH: "/react-shopping-cart",
}));
jest.mock("../domains/cart/apis/getCartItems");
jest.mock("../domains/cart/apis/deleteCartItem");
jest.mock("../domains/cart/apis/patchCartItem");
jest.mock("../domains/coupon/apis/getCoupons");

const mockCartItems = [
  {
    id: 101,
    quantity: 1,
    product: {
      id: 1,
      name: "유기농 바나나",
      price: 4500,
      imageUrl: "https://banana.jpg",
      category: "식료품",
      stock: 3,
    },
  },
  {
    id: 102,
    quantity: 2,
    product: {
      id: 2,
      name: "신선한 사과 1kg",
      price: 7900,
      imageUrl: "https://apple.jpg",
      category: "식료품",
      stock: 5,
    },
  },
];

const renderWithProviders = async (component: ReactNode) => {
  await act(async () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <CartProvider>
            <CouponProvider>
              <OrderProvider>
                <ModalProvider>{component}</ModalProvider>
              </OrderProvider>
            </CouponProvider>
          </CartProvider>
        </ToastProvider>
      </MemoryRouter>
    );
  });
};

describe("Error 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("장바구니 목록을 불러오는데 실패하면 에러 메시지를 표시한다.", async () => {
    (getCartItems as jest.Mock).mockRejectedValue(
      new Error("장바구니를 가져오는 데 실패했습니다.")
    );

    await renderWithProviders(<CartPage />);

    await screen.findByText("장바구니를 가져오는 데 실패했습니다.");
  });

  it("장바구니 아이템 삭제에 실패하면 에러 메시지를 표시한다.", async () => {
    (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
    (deleteCartItem as jest.Mock).mockRejectedValue(
      new Error("장바구니에 상품을 제거하던 중 에러가 발생했습니다.")
    );

    await renderWithProviders(<CartPage />);

    await screen.findByText("유기농 바나나");

    const deleteButton = screen.getAllByText("삭제")[0];
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    await screen.findByText(
      "장바구니에 상품을 제거하던 중 에러가 발생했습니다."
    );
  });

  it("수량 변경에 실패하면 에러 메시지를 표시한다.", async () => {
    (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
    (patchCartItem as jest.Mock).mockRejectedValue(
      new Error("장바구니에서 상품의 수량을 조절하던 중 에러가 발생했습니다.")
    );

    await renderWithProviders(<CartPage />);

    await screen.findByText("유기농 바나나");

    const increaseButton = screen.getAllByAltText("수량 증가")[0];
    await act(async () => {
      fireEvent.click(increaseButton);
    });

    await screen.findByText(
      "장바구니에서 상품의 수량을 조절하던 중 에러가 발생했습니다."
    );
  });

  it("쿠폰 정보를 불러오는데 실패하면 에러 메시지를 표시한다.", async () => {
    (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
    (getCoupons as jest.Mock).mockRejectedValue(
      new Error("쿠폰 정보를 가져오는 데 실패했습니다.")
    );

    await renderWithProviders(<OrderPage />);

    await screen.findByText("쿠폰 정보를 가져오는 데 실패했습니다.");
  });
});
