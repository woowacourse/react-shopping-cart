import { act, waitFor } from "@testing-library/react";
import { deleteCartItem } from "../apis/cartItems/deleteCartItem";
import { getCartItems } from "../apis/cartItems/getCartItems";
import { patchCartItem } from "../apis/cartItems/patchCartItem";
import { renderCartHook } from "../test-utils/renderCartHook";
import { getCoupons } from "../apis/coupons/getCoupons";

jest.mock("../apis/httpClient", () => ({
  API_KEY: "mock-api-key",
}));
jest.mock("../apis/cartItems/getCartItems");
jest.mock("../apis/cartItems/deleteCartItem");
jest.mock("../apis/cartItems/patchCartItem");
jest.mock("../apis/coupons/getCoupons");

const mockGetCartItems = getCartItems as jest.MockedFunction<
  typeof getCartItems
>;
const mockDeleteCartItem = deleteCartItem as jest.MockedFunction<
  typeof deleteCartItem
>;
const mockPatchCartItem = patchCartItem as jest.MockedFunction<
  typeof patchCartItem
>;
const mockGetCoupons = getCoupons as jest.MockedFunction<typeof getCoupons>;
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

describe("useCart 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    mockGetCartItems.mockResolvedValue(mockCartItems);
    mockDeleteCartItem.mockResolvedValue();
    mockPatchCartItem.mockResolvedValue();
    mockGetCoupons.mockResolvedValue([]);
  });

  describe("초기 렌더링했을 때", () => {
    it("전체 장바구니 상품 데이터가 불러와지고, 원본 상태와 파생 상태가 초기화된다.", async () => {
      localStorage.setItem("checkedItems", JSON.stringify([101, 102]));

      const { result } = renderCartHook();

      await waitFor(() => {
        expect(mockGetCartItems).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
        expect(result.current.cartItemsCheckData).toHaveLength(
          mockCartItems.length
        );
      });

      expect(
        result.current.cartItemsCheckData.every((item) => item.checked)
      ).toBe(true);
    });
  });

  describe("특정 상품의 삭제 버튼을 클릭했을 때", () => {
    it("특정 상품이 장바구니에서 삭제된다.", async () => {
      const { result } = renderCartHook();

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      });

      const remainingItems = mockCartItems.slice(1);
      mockGetCartItems.mockResolvedValueOnce(remainingItems);

      await act(async () => {
        await result.current.deleteItem(101);
      });

      expect(mockDeleteCartItem).toHaveBeenCalledWith(101);
      expect(mockGetCartItems).toHaveBeenCalledTimes(2);

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(
          remainingItems.length
        );
        expect(result.current.cartItemsCheckData).toHaveLength(
          remainingItems.length
        );
      });
    });

    it("삭제한 상품의 가격만큼 주문 금액 정보가 변경된다.", async () => {
      localStorage.setItem("checkedItems", JSON.stringify([101, 102]));

      const { result } = renderCartHook();

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      });

      const firstItemPrice =
        mockCartItems[0].product.price * mockCartItems[0].quantity;
      const secondItemPrice =
        mockCartItems[1].product.price * mockCartItems[1].quantity;
      const totalPrice = firstItemPrice + secondItemPrice;

      await waitFor(() => {
        expect(result.current.orderPrice).toBe(totalPrice);
      });

      const remainingItems = [mockCartItems[1]];
      mockGetCartItems.mockResolvedValueOnce(remainingItems);

      await act(async () => {
        await result.current.deleteItem(101);
      });

      await waitFor(() => {
        expect(result.current.orderPrice).toBe(secondItemPrice);
      });
    });
  });

  describe("특정 상품의 개수를 증가시켰을 때", () => {
    it("특정 상품의 수량이 증가한다.", async () => {
      const { result } = renderCartHook();

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      });

      const initialQuantity = mockCartItems[0].quantity;

      const updatedCartItems = [...mockCartItems];
      updatedCartItems[0] = {
        ...updatedCartItems[0],
        quantity: initialQuantity + 1,
      };
      mockGetCartItems.mockResolvedValueOnce(updatedCartItems);

      await act(async () => {
        await result.current.increaseItemQuantity(101, initialQuantity);
      });

      expect(mockPatchCartItem).toHaveBeenCalledWith({
        cartId: 101,
        quantity: initialQuantity + 1,
      });

      await waitFor(() => {
        expect(result.current.cartItemsData[0].quantity).toBe(
          initialQuantity + 1
        );
        expect(result.current.cartItemsCheckData[0].quantity).toBe(
          initialQuantity + 1
        );
      });
    });

    it("수량을 증가시킨 상품의 가격만큼 주문 금액 정보가 변경된다.", async () => {
      localStorage.setItem("checkedItems", JSON.stringify([101, 102]));

      const { result } = renderCartHook();

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      });

      const initialTotal = mockCartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );

      await waitFor(() => {
        expect(result.current.orderPrice).toBe(initialTotal);
      });

      const updatedCartItems = [...mockCartItems];
      updatedCartItems[0] = {
        ...updatedCartItems[0],
        quantity: mockCartItems[0].quantity + 1,
      };
      mockGetCartItems.mockResolvedValueOnce(updatedCartItems);

      await act(async () => {
        await result.current.increaseItemQuantity(
          101,
          mockCartItems[0].quantity
        );
      });

      await waitFor(() => {
        expect(result.current.orderPrice).toBe(
          initialTotal + mockCartItems[0].product.price
        );
      });
    });
  });

  describe("특정 상품의 개수를 감소시켰을 때", () => {
    it("특정 상품의 수량이 감소한다.", async () => {
      const { result } = renderCartHook();

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      });

      const initialQuantity = mockCartItems[1].quantity;
      expect(initialQuantity).toBeGreaterThan(1);

      const updatedCartItems = [...mockCartItems];
      updatedCartItems[1] = {
        ...updatedCartItems[1],
        quantity: initialQuantity - 1,
      };
      mockGetCartItems.mockResolvedValueOnce(updatedCartItems);

      await act(async () => {
        await result.current.decreaseItemQuantity(102, initialQuantity);
      });

      expect(mockPatchCartItem).toHaveBeenCalledWith({
        cartId: 102,
        quantity: initialQuantity - 1,
      });

      await waitFor(() => {
        expect(result.current.cartItemsData[1].quantity).toBe(
          initialQuantity - 1
        );
        expect(result.current.cartItemsCheckData[1].quantity).toBe(
          initialQuantity - 1
        );
      });
    });

    it("수량을 감소시킨 상품의 가격만큼 주문 금액 정보가 변경된다.", async () => {
      localStorage.setItem("checkedItems", JSON.stringify([101, 102]));

      const { result } = renderCartHook();

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      });

      const initialQuantity = mockCartItems[1].quantity;
      const productPrice = mockCartItems[1].product.price;
      const initialTotal = mockCartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );

      await waitFor(() => {
        expect(result.current.orderPrice).toBe(initialTotal);
      });

      const updatedCartItems = [...mockCartItems];
      updatedCartItems[1] = {
        ...updatedCartItems[1],
        quantity: initialQuantity - 1,
      };
      mockGetCartItems.mockResolvedValueOnce(updatedCartItems);

      await act(async () => {
        await result.current.decreaseItemQuantity(102, initialQuantity);
      });

      await waitFor(() => {
        expect(result.current.orderPrice).toBe(initialTotal - productPrice);
      });
    });
  });

  describe("전체 선택 버튼 클릭했을 때", () => {
    it("전체 선택이 되어있는 경우 전체 선택을 취소하면, 모든 상품의 개별 선택 여부가 false로 변경된다.", async () => {
      localStorage.setItem("checkedItems", JSON.stringify([101, 102]));

      const { result } = renderCartHook();

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      });

      await waitFor(() => {
        expect(result.current.isAllChecked).toBe(true);
        expect(
          result.current.cartItemsCheckData.every((item) => item.checked)
        ).toBe(true);
      });

      act(() => {
        result.current.toggleAllChecked();
      });

      expect(result.current.isAllChecked).toBe(false);
      expect(
        result.current.cartItemsCheckData.every((item) => !item.checked)
      ).toBe(true);
      expect(result.current.orderPrice).toBe(0);
      expect(result.current.shippingFee).toBe(0);
      expect(result.current.totalPrice).toBe(0);
    });

    it("전체 선택이 되어 있지 않은 경우 전체 선택을 하면, 모든 상품의 개별 선택 여부가 true로 변경된다.", async () => {
      localStorage.setItem("checkedItems", JSON.stringify([]));

      const { result } = renderCartHook();

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      });

      await waitFor(() => {
        expect(result.current.isAllChecked).toBe(false);
        expect(
          result.current.cartItemsCheckData.every((item) => !item.checked)
        ).toBe(true);
      });

      act(() => {
        result.current.toggleAllChecked();
      });

      expect(result.current.isAllChecked).toBe(true);
      expect(
        result.current.cartItemsCheckData.every((item) => item.checked)
      ).toBe(true);

      const expectedTotal = mockCartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );
      expect(result.current.orderPrice).toBe(expectedTotal);
      expect(result.current.shippingFee).toBe(3000);
      expect(result.current.totalPrice).toBe(expectedTotal + 3000);
    });
  });

  describe("특정 상품의 선택 버튼을 클릭했을 때", () => {
    it("이미 선택이 되어있는 경우 취소하면, 선택한 상품의 가격만큼 주문 금액 정보가 변경된다.", async () => {
      localStorage.setItem("checkedItems", JSON.stringify([101, 102]));

      const { result } = renderCartHook();

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      });

      const firstItemPrice =
        mockCartItems[0].quantity * mockCartItems[0].product.price;
      const initialTotal = mockCartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );

      await waitFor(() => {
        expect(result.current.orderPrice).toBe(initialTotal);
      });

      act(() => {
        result.current.toggleItemChecked(101);
      });

      expect(result.current.getItemChecked(101)).toBe(false);
      expect(result.current.getItemChecked(102)).toBe(true);
      expect(result.current.orderPrice).toBe(initialTotal - firstItemPrice);
    });

    it("선택이 되어있지 않은 경우 선택하면, 선택한 상품의 가격만큼 주문 금액 정보가 변경된다.", async () => {
      localStorage.setItem("checkedItems", JSON.stringify([]));

      const { result } = renderCartHook();

      await waitFor(() => {
        expect(result.current.cartItemsData).toHaveLength(mockCartItems.length);
      });

      await waitFor(() => {
        expect(result.current.orderPrice).toBe(0);
      });

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
