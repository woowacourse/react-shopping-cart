import { act, renderHook, waitFor } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import { deleteCartItem } from "../apis/deleteCartItem";
import { getCartItems } from "../apis/getCartItems";
import { patchCartItem } from "../apis/patchCartItem";
import { CartProvider } from "../contexts/CartContext";
import useCart from "../domains/cart/hooks/useCart";
import { ToastProvider } from "../../../features/toast/ToastContext";

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

const wrapper = ({ children }: PropsWithChildren) => (
  <MemoryRouter>
    <ToastProvider>
      <CartProvider>{children}</CartProvider>
    </ToastProvider>
  </MemoryRouter>
);

describe("useCart 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCartItems as jest.Mock).mockResolvedValue(mockCartItems);
  });

  describe("장바구니가 비어있을 때", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      (getCartItems as jest.Mock).mockResolvedValue([]);
    });

    it("장바구니 상품 데이터가 빈 배열로 초기화된다", async () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(getCartItems).toHaveBeenCalled();
      });

      expect(result.current.cartItemsData).toEqual([]);
      expect(result.current.cartItemsCheckData).toEqual([]);
    });

    it("파생 상태들이 올바르게 초기화된다", async () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(getCartItems).toHaveBeenCalled();
      });

      expect(result.current.cartItemCount).toBe(0);
      expect(result.current.orderItemCount).toBe(0);
      expect(result.current.orderQuantity).toBe(0);
      expect(result.current.orderPrice).toBe(0);
      expect(result.current.shippingFee).toBe(0);
      expect(result.current.totalPrice).toBe(0);
    });
  });

  describe("초기 렌더링했을 때", () => {
    it("전체 장바구니 상품 데이터가 불러와지고, 원본 상태가 초기화된다.", async () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(getCartItems).toHaveBeenCalled();
      });

      expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      expect(result.current.cartItemsCheckData).toHaveLength(
        mockCartItems.length
      );
      expect(result.current.allChecked).toBeTruthy();
    });

    it("파생 상태가 원본 상태에 따라 올바르게 계산되어 초기화된다.", async () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(getCartItems).toHaveBeenCalled();
      });

      expect(result.current.cartItemCount).toBe(mockCartItems.length);
      expect(result.current.orderItemCount).toBe(mockCartItems.length);
      expect(result.current.totalPrice).toBeGreaterThan(0);

      if (result.current.orderPrice >= 100_000) {
        expect(result.current.shippingFee).toBe(0);
      } else if (result.current.orderPrice > 0) {
        expect(result.current.shippingFee).toBe(3_000);
      } else {
        expect(result.current.shippingFee).toBe(0);
      }
    });

    it("전체 상품이 선택된다.", async () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(result.current.allChecked).toBe(true);
        result.current.cartItemsCheckData.forEach((item) => {
          expect(item.checked).toBe(true);
        });
        expect(result.current.hasCheckedItem).toBe(true);
      });
    });
  });

  describe("특정 상품의 삭제 버튼을 클릭했을 때", () => {
    it("특정 상품이 장바구니에서 삭제된다.", async () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      });

      await act(async () => {
        await result.current.deleteItem(101);
      });

      expect(deleteCartItem).toHaveBeenCalledWith(101);
      expect(getCartItems).toHaveBeenCalledTimes(2);
    });

    it("삭제한 상품의 가격만큼 주문 금액 정보가 변경된다.", async () => {
      const firstItemPrice = mockCartItems[0].product.price;
      const secondItemPrice =
        mockCartItems[1].product.price * mockCartItems[1].quantity;
      const totalPrice = firstItemPrice + secondItemPrice;

      (getCartItems as jest.Mock)
        .mockResolvedValueOnce(mockCartItems)
        .mockResolvedValueOnce([mockCartItems[1]]);

      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(result.current.orderPrice).toBe(totalPrice);
      });

      await act(async () => {
        await result.current.deleteItem(101);
      });

      expect(result.current.orderPrice).toBe(secondItemPrice);
    });
  });

  describe("특정 상품의 개수를 증가시켰을 때", () => {
    it("특정 상품의 수량이 증가한다.", async () => {
      const initialQuantity = mockCartItems[0].quantity;

      const updatedCartItems = [...mockCartItems];
      updatedCartItems[0] = {
        ...updatedCartItems[0],
        quantity: initialQuantity + 1,
      };

      (getCartItems as jest.Mock)
        .mockResolvedValueOnce(mockCartItems)
        .mockResolvedValueOnce(updatedCartItems);

      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(result.current.cartItemsData[0].quantity).toBe(initialQuantity);
      });

      await act(async () => {
        await result.current.increaseItemQuantity(101, initialQuantity);
      });

      expect(patchCartItem).toHaveBeenCalledWith({
        cartId: 101,
        quantity: initialQuantity + 1,
      });

      expect(result.current.cartItemsData[0].quantity).toBe(
        initialQuantity + 1
      );
    });

    it("수량을 증가시킨 상품의 가격만큼 주문 금액 정보가 변경된다.", async () => {
      const initialQuantity = mockCartItems[0].quantity;
      const productPrice = mockCartItems[0].product.price;

      const updatedCartItems = [...mockCartItems];
      updatedCartItems[0] = {
        ...updatedCartItems[0],
        quantity: initialQuantity + 1,
      };

      (getCartItems as jest.Mock)
        .mockResolvedValueOnce(mockCartItems)
        .mockResolvedValueOnce(updatedCartItems);

      const { result } = renderHook(() => useCart(), { wrapper });

      const initialTotal = mockCartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );

      await waitFor(() => {
        expect(result.current.orderPrice).toBe(initialTotal);
      });

      await act(async () => {
        await result.current.increaseItemQuantity(101, initialQuantity);
      });

      expect(result.current.orderPrice).toBe(initialTotal + productPrice);
    });
  });

  describe("특정 상품의 개수를 감소시켰을 때", () => {
    it("특정 상품의 수량이 감소한다.", async () => {
      const initialQuantity = mockCartItems[1].quantity;
      expect(initialQuantity).toBeGreaterThan(1);

      const updatedCartItems = [...mockCartItems];
      updatedCartItems[1] = {
        ...updatedCartItems[1],
        quantity: initialQuantity - 1,
      };

      (getCartItems as jest.Mock)
        .mockResolvedValueOnce(mockCartItems)
        .mockResolvedValueOnce(updatedCartItems);

      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(result.current.cartItemsData[1].quantity).toBe(initialQuantity);
      });

      await act(async () => {
        await result.current.decreaseItemQuantity(102, initialQuantity);
      });

      expect(patchCartItem).toHaveBeenCalledWith({
        cartId: 102,
        quantity: initialQuantity - 1,
      });

      expect(result.current.cartItemsData[1].quantity).toBe(
        initialQuantity - 1
      );
    });

    it("수량을 감소시킨 상품의 가격만큼 주문 금액 정보가 변경된다.", async () => {
      const initialQuantity = mockCartItems[1].quantity;
      const productPrice = mockCartItems[1].product.price;

      const updatedCartItems = [...mockCartItems];
      updatedCartItems[1] = {
        ...updatedCartItems[1],
        quantity: initialQuantity - 1,
      };

      (getCartItems as jest.Mock)
        .mockResolvedValueOnce(mockCartItems)
        .mockResolvedValueOnce(updatedCartItems);

      const { result } = renderHook(() => useCart(), { wrapper });

      const initialTotal = mockCartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );

      await waitFor(() => {
        expect(result.current.orderPrice).toBe(initialTotal);
      });

      await act(async () => {
        await result.current.decreaseItemQuantity(102, initialQuantity);
      });

      expect(result.current.orderPrice).toBe(initialTotal - productPrice);
    });
  });

  describe("전체 선택 버튼 클릭했을 때", () => {
    it("전체 선택이 되어있는 경우 전체 선택을 취소하면, 모든 상품의 개별 선택 여부가 false로 변경된다.", async () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(result.current.allChecked).toBe(true);
      });

      act(() => {
        result.current.toggleAllChecked();
      });

      expect(result.current.allChecked).toBe(false);
      result.current.cartItemsCheckData.forEach((item) => {
        expect(item.checked).toBe(false);
      });

      expect(result.current.orderPrice).toBe(0);
      expect(result.current.shippingFee).toBe(0);
      expect(result.current.totalPrice).toBe(0);
    });

    it("전체 선택이 되어 있지 않은 경우 전체 선택을 하면, 모든 상품의 개별 선택 여부가 true로 변경된다.", async () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      });

      act(() => {
        result.current.toggleAllChecked();
      });

      expect(result.current.allChecked).toBe(false);

      act(() => {
        result.current.toggleAllChecked();
      });

      expect(result.current.allChecked).toBe(true);
      result.current.cartItemsCheckData.forEach((item) => {
        expect(item.checked).toBe(true);
      });

      const expectedTotal = mockCartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );

      expect(result.current.orderPrice).toBe(expectedTotal);
    });
  });

  describe("특정 상품의 선택 버튼을 클릭했을 때", () => {
    it("이미 선택이 되어있는 경우 취소하면, 선택한 상품의 가격만큼 주문 금액 정보가 변경된다.", async () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      });

      const firstItemPrice =
        mockCartItems[0].quantity * mockCartItems[0].product.price;
      const initialTotal = mockCartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );

      act(() => {
        result.current.toggleItemChecked(101);
      });

      expect(result.current.getItemChecked(101)).toBe(false);
      expect(result.current.getItemChecked(102)).toBe(true);

      expect(result.current.orderPrice).toBe(initialTotal - firstItemPrice);
    });

    it("선택이 되어있지 않은 경우 선택하면, 선택한 상품의 가격만큼 주문 금액 정보가 변경된다.", async () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      });

      act(() => {
        result.current.toggleAllChecked();
      });

      expect(result.current.orderPrice).toBe(0);

      act(() => {
        result.current.toggleItemChecked(101);
      });

      expect(result.current.getItemChecked(101)).toBe(true);
      expect(result.current.getItemChecked(102)).toBe(false);

      const firstItemPrice =
        mockCartItems[0].quantity * mockCartItems[0].product.price;
      expect(result.current.orderPrice).toBe(firstItemPrice);
    });
  });
});
