import {
  calculateTotalPrice,
  calculateShippingFee,
  calcTotalQuantity,
  calcDeliveryPrice,
  getDiscountPriceByType,
  getDiscountPrice,
} from "../src/domains/price";
import { ResponseCartItem } from "../src/types/types";
import { coupons } from "./coupon.test";

const mockCartItems: ResponseCartItem[] = [
  {
    id: 1,
    quantity: 3,
    product: {
      id: 1,
      name: "상품1",
      price: 10000,
      imageUrl: "test.jpg",
      category: "테스트",
    },
  },
  {
    id: 2,
    quantity: 2,
    product: {
      id: 2,
      name: "상품2",
      price: 15000,
      imageUrl: "test2.jpg",
      category: "테스트",
    },
  },
];

describe("장바구니 유틸리티 함수 테스트", () => {
  describe("calculateTotalPrice - 총 가격 계산", () => {
    test("총 가격을 올바르게 계산해야 한다", () => {
      expect(calculateTotalPrice(mockCartItems)).toBe(60000);
    });

    test("빈 장바구니의 경우 가격이 0원이다", () => {
      expect(calculateTotalPrice([])).toBe(0);
    });
  });

  describe("calculateShippingFee - 배송비 계산", () => {
    test("10만원 이상 주문 시 배송비는 0원이어야 한다", () => {
      expect(calculateShippingFee(150000)).toBe(0);
    });

    test("정확히 10만원 주문 시 배송비는 0원이어야 한다", () => {
      expect(calculateShippingFee(100000)).toBe(0);
    });

    test("10만원 미만 주문 시 배송비는 3000원이어야 한다", () => {
      expect(calculateShippingFee(50000)).toBe(3000);
    });

    test("주문 금액이 0원일 때 배송비는 0원이어야 한다", () => {
      expect(calculateShippingFee(0)).toBe(0);
    });
  });

  describe("calcTotalQuantity - 총 수량 계산", () => {
    test("총 수량을 올바르게 계산해야 한다", () => {
      expect(calcTotalQuantity(mockCartItems)).toBe(5);
    });

    test("빈 장바구니의 경우 0을 반환해야 한다", () => {
      expect(calcTotalQuantity([])).toBe(0);
    });
  });

  describe("calcDeliveryPrice - 배송비 계산", () => {
    test("10만원 이상 주문, 제주도 아닐 때 배송비는 0원이어야 한다", () => {
      expect(calcDeliveryPrice(150000, false)).toBe(0);
    });

    test("10만원 이상 주문, 제주도일 때 배송비는 3000원이어야 한다", () => {
      expect(calcDeliveryPrice(150000, true)).toBe(3000);
    });

    test("10만원 미만 주문, 제주도 아닐 때 배송비는 3000원이어야 한다", () => {
      expect(calcDeliveryPrice(50000, false)).toBe(3000);
    });

    test("10만원 미만 주문, 제주도일 때 배송비는 6000원이어야 한다", () => {
      expect(calcDeliveryPrice(50000, true)).toBe(6000);
    });
  });

  describe("getDiscountPriceByType - 쿠폰 타입별 할인 계산", () => {
    test("고정 할인 금액을 반환해야 한다", () => {
      const result = getDiscountPriceByType({
        coupon: coupons[0],
        orderPrice: 30000,
      });
      expect(result).toBe(5000);
    });

    test("퍼센트 할인을 계산해야 한다", () => {
      const result = getDiscountPriceByType({
        coupon: coupons[3],
        orderPrice: 30000,
      });
      expect(result).toBe(9000);
    });

    test("무료배송 쿠폰의 경우 배송비를 반환해야 한다", () => {
      const result = getDiscountPriceByType({
        coupon: coupons[2],
        deliveryPrice: 3000,
      });
      expect(result).toBe(3000);
    });

    test("2+1 할인을 계산해야 한다", () => {
      const cartItems = [
        { product: { price: 10000 }, quantity: 6 },
      ] as ResponseCartItem[];

      const result = getDiscountPriceByType({
        coupon: coupons[1],
        selectedCartItem: cartItems,
      });
      expect(result).toBe(20000);
    });
  });

  describe("getDiscountPrice - 전체 할인 가격 계산", () => {
    test("단일 쿠폰을 적용해야 한다", () => {
      const result = getDiscountPrice({
        selectedCoupon: [coupons[0]],
        orderPrice: 30000,
      });
      expect(result).toBe(5000);
    });

    test("두 개의 쿠폰을 적용하고 최대 할인 금액을 반환해야 한다", () => {
      const result = getDiscountPrice({
        selectedCoupon: [coupons[0], coupons[3]],
        orderPrice: 30000,
      });

      expect(result).toBe(14000);
    });
  });
});
