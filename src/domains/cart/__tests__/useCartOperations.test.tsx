import { act, renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import { ToastProvider } from "../../../features/toast/ToastContext";
import { deleteCartItem } from "../apis/deleteCartItem";
import { getCartItems } from "../apis/getCartItems";
import { patchCartItem } from "../apis/patchCartItem";
import { CartProvider } from "../contexts/CartContext";
import useCartOperations from "../hooks/useCartOperations";

jest.mock("../../../apis/httpClient", () => ({
  API_KEY: "mock-api-key",
}));
jest.mock("../../../apis/config", () => ({
  API_BASE_URL: "http://mock-api-url.com",
  CLIENT_BASE_PATH: "/react-shopping-cart",
}));
jest.mock("../apis/getCartItems");
jest.mock("../apis/deleteCartItem");
jest.mock("../apis/patchCartItem");

const mockCartItems = [
  {
    id: 101,
    quantity: 1,
    selected: true,
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
    selected: true,
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

const wrapper = ({ children }: PropsWithChildren) => (
  <MemoryRouter>
    <ToastProvider>
      <CartProvider>{children}</CartProvider>
    </ToastProvider>
  </MemoryRouter>
);

describe("useCartOperations 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
  });

  it("장바구니 데이터를 불러올 수 있다", async () => {
    const { result } = renderHook(() => useCartOperations(), { wrapper });

    await act(async () => {
      await result.current.fetchData();
    });

    expect(getCartItems).toHaveBeenCalled();
  });

  it("상품을 삭제할 수 있다", async () => {
    const { result } = renderHook(() => useCartOperations(), { wrapper });

    await act(async () => {
      await result.current.deleteItem(101);
    });

    expect(deleteCartItem).toHaveBeenCalledWith(101);
  });

  it("상품 수량을 증가시킬 수 있다", async () => {
    const initialQuantity = mockCartItems[0].quantity;

    const { result } = renderHook(() => useCartOperations(), { wrapper });

    await act(async () => {
      await result.current.updateItemQuantity(101, initialQuantity + 1);
    });

    expect(patchCartItem).toHaveBeenCalledWith({
      cartId: 101,
      quantity: initialQuantity + 1,
    });
  });

  it("상품 수량을 감소시킬 수 있다", async () => {
    const initialQuantity = 2;

    const { result } = renderHook(() => useCartOperations(), { wrapper });

    await act(async () => {
      await result.current.updateItemQuantity(102, initialQuantity - 1);
    });

    expect(patchCartItem).toHaveBeenCalledWith({
      cartId: 102,
      quantity: initialQuantity - 1,
    });
  });
});
