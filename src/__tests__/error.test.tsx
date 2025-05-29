import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getCartItems } from "../apis/cartItems/getCartItems";
import { deleteCartItem } from "../apis/cartItems/deleteCartItem";
import { patchCartItem } from "../apis/cartItems/patchCartItem";
import CartPage from "../pages/CartPage/CartPage";
import { ToastProvider } from "../contexts/ToastContext";
import { CartProvider } from "../contexts/CartContext";
import MobileLayout from "../components/MobileLayout/MobileLayout";

jest.mock("../apis/httpClient", () => ({
  API_KEY: "mock-api-key",
}));
jest.mock("../apis/cartItems/getCartItems");
jest.mock("../apis/cartItems/deleteCartItem");
jest.mock("../apis/cartItems/patchCartItem");

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

describe("Error 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("장바구니 목록을 불러오는데 실패하면 에러 메시지를 표시한다.", async () => {
    (getCartItems as jest.Mock).mockRejectedValue(
      new Error("장바구니를 가져오는 데 실패했습니다.")
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <MobileLayout>
            <ToastProvider>
              <CartProvider>
                <CartPage />
              </CartProvider>
            </ToastProvider>
          </MobileLayout>
        </MemoryRouter>
      );
    });

    await screen.findByText("장바구니를 가져오는 데 실패했습니다.");
  });

  it("장바구니 아이템 삭제에 실패하면 에러 메시지를 표시한다.", async () => {
    (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
    (deleteCartItem as jest.Mock).mockRejectedValue(
      new Error("장바구니에 상품을 제거하던 중 에러가 발생했습니다.")
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <MobileLayout>
            <ToastProvider>
              <CartProvider>
                <CartPage />
              </CartProvider>
            </ToastProvider>
          </MobileLayout>
        </MemoryRouter>
      );
    });

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

    await act(async () => {
      render(
        <MemoryRouter>
          <MobileLayout>
            <ToastProvider>
              <CartProvider>
                <CartPage />
              </CartProvider>
            </ToastProvider>
          </MobileLayout>
        </MemoryRouter>
      );
    });

    await screen.findByText("유기농 바나나");

    const increaseButton = screen.getAllByAltText("수량 증가")[0];
    await act(async () => {
      fireEvent.click(increaseButton);
    });

    await screen.findByText(
      "장바구니에서 상품의 수량을 조절하던 중 에러가 발생했습니다."
    );
  });
});
