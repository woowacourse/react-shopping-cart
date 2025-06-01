import { calculatePrices, getCartStats } from "../utils/cartCalculations";
import { CartItemWithCheck } from "../../types/cartItem";

describe("cartCalculations.ts에 있는 함수 검증 ", () => {
  const mockCartItems: CartItemWithCheck[] = [
    {
      id: 1,
      quantity: 2,
      product: { id: 1, name: "Test Item 1", price: 50000, imageUrl: "test1.jpg", quantity: 10, category: "test" },
      isChecked: true,
    },
    {
      id: 2,
      quantity: 1,
      product: { id: 2, name: "Test Item 2", price: 30000, imageUrl: "test2.jpg", quantity: 3, category: "test" },
      isChecked: false,
    },
  ];

  describe("calculatePrices 함수 검증", () => {
    it("체크된 상품들의 주문 금액을 계산한다", () => {
      const result = calculatePrices(mockCartItems);
      expect(result.orderPrice).toBe(100000); // 2 * 50000
    });

    it("주문 금액이 100,000원 이상일 때 배송비가 0원이다", () => {
      const result = calculatePrices(mockCartItems);
      expect(result.deliveryPrice).toBe(0);
    });

    it("주문 금액이 100,000원 미만일 때 배송비가 3000원이다", () => {
      const smallOrderItems = [
        {
          ...mockCartItems[0],
          quantity: 1,
          product: { ...mockCartItems[0].product, price: 30000 },
        },
      ];
      const result = calculatePrices(smallOrderItems);
      expect(result.deliveryPrice).toBe(3000);
    });
  });

  describe("getCartStats 함수 검증", () => {
    it("전체 상품 개수를 반환한다", () => {
      const result = getCartStats(mockCartItems);
      expect(result.cartItemsCount).toBe(2);
    });

    it("체크된 상품 개수를 반환한다", () => {
      const result = getCartStats(mockCartItems);
      expect(result.cartItemsCheckedCount).toBe(1);
    });

    it("체크된 상품들의 총 수량을 계산한다", () => {
      const result = getCartStats(mockCartItems);
      expect(result.cartItemsTotalQuantity).toBe(2);
    });
  });
});
