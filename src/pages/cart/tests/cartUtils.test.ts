import { describe, it, expect } from "vitest";
import calculateCartAmount from "../utils/calculateCartAmount";
import calculateCartPrice from "../utils/calculateCartPrice";
import { CartItem } from "../../../shared/types/cartItem";
import { DEFAULT_DELIVERY_PRICE } from "../constants";
import MOCKING_CART_ITEMS_DATA from "../../../shared/apis/mocks/data/cartItems.json";

describe("장바구니 유틸리티 함수 테스트", () => {
  const mockCartItems: CartItem[] = MOCKING_CART_ITEMS_DATA.content;
  const checkedIds = [1629, 1965];

  describe("calculateCartAmount 테스트", () => {
    const result = calculateCartAmount(mockCartItems, checkedIds);
    it("전체 상품 개수를 올바르게 계산한다.", () => {
      expect(result.cartItemsCount).toBe(4);
    });

    it("체크된 상품 개수를 올바르게 계산한다.", () => {
      expect(result.cartItemsCheckedCount).toBe(2);
    });

    it("체크된 상품들의 총 수량을 올바르게 계산한다.", () => {
      const result = calculateCartAmount(mockCartItems, checkedIds);
      // 19×19×19 큐브(2개) + 달 무드등(1개) = 3개
      expect(result.cartItemsTotalQuantity).toBe(3);
    });

    describe("calculateCartPrice 테스트", () => {
      it("체크된 상품들의 주문 금액을 올바르게 계산한다.", () => {
        const result = calculateCartPrice(mockCartItems, checkedIds);

        // 19×19×19 큐브(2개 * 850000원) + 달 무드등(1개 * 28000원) = 1,728,000원
        expect(result.orderPrice).toBe(1728000);
      });

      it("주문 금액이 무료 배송 기준 미만일 때 배송비가 포함된다.", () => {
        const checkedIds = [1965];
        const result = calculateCartPrice(mockCartItems, checkedIds);

        // 달 무드등(1개 * 28000원) = 28000원 < 무료 배송 기준(100000원)
        expect(result.deliveryPrice).toBe(DEFAULT_DELIVERY_PRICE);
      });

      it("주문 금액이 무료 배송 기준 이상일 때 배송비가 무료다.", () => {
        const result = calculateCartPrice(mockCartItems, checkedIds);
        expect(result.deliveryPrice).toBe(0);
      });

      it("상품들의 총 주문 금액(배송비 + 주문금액)을 올바르게 계산한다.", () => {
        const checkedIds = [1965];
        const result = calculateCartPrice(mockCartItems, checkedIds);

        // 달 무드등(1개 * 28000원) = 28000원 < 무료 배송 기준(100000원)
        expect(result.totalPrice).toBe(28000 + DEFAULT_DELIVERY_PRICE);
      });
    });
  });
});
