import { describe, it, expect, beforeEach } from "vitest";
import { CouponType, ResponseCartItem } from "../src/types/types";
import { getCouponText, getPossibleToUse } from "../src/domains/coupon";

export const coupons: CouponType[] = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2025-06-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2025-08-31",
    minimumAmount: 50000,
    discountType: "freeShipping",
  },
  {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    expirationDate: "2025-07-31",
    discount: 30,
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
    discountType: "percentage",
  },
];

describe("getCouponText", () => {
  describe("고정 할인 쿠폰", () => {
    it("최소 주문 금액 정보를 포함한다", () => {
      const result = getCouponText(coupons[0]);

      expect(result).toHaveLength(2);
      expect(result[0]).toBe("만료일: 2025년 11월 30일");
      expect(result[1]).toBe("최소 주문 금액: 100,000원");
    });
  });

  describe("퍼센트 할인 쿠폰", () => {
    it("사용 가능 시간 정보를 포함한다", () => {
      const result = getCouponText(coupons[3]);

      expect(result).toHaveLength(2);
      expect(result[0]).toBe("만료일: 2025년 07월 31일");
      expect(result[1]).toBe("사용 가능 시간: 오전 4시부터 7시까지");
    });
  });

  describe("buyXgetY 쿠폰", () => {
    it("만료일만 표시한다", () => {
      const result = getCouponText(coupons[1]);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe("만료일: 2025년 06월 30일");
    });
  });
});

describe("getPossibleToUse 함수 테스트", () => {
  let mockCartItems: ResponseCartItem[];

  beforeEach(() => {
    mockCartItems = [
      {
        id: 1,
        quantity: 3,
        product: {
          id: 1,
          name: "상품1",
          price: 10000,
          imageUrl: "test.jpg",
          category: "테스트",
          quantity: 10,
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
          quantity: 5,
        },
      },
    ];
  });

  describe("쿠폰 개수 제한", () => {
    it("이미 2개 쿠폰이 선택된 경우, 다른 타입은 선택 불가하다", () => {
      const selectedCoupons: CouponType[] = [coupons[0], coupons[1]];

      const result = getPossibleToUse({
        data: coupons[2],
        orderPrice: 50000,
        orderProducts: mockCartItems,
        deliveryPrice: 3000,
        selectedCoupons,
      });

      expect(result).toBe(false);
    });
  });

  describe("만료일 검사", () => {
    it("만료된 쿠폰은 사용할 수 없다", () => {
      const expiredCoupon: CouponType = {
        id: 1,
        code: "EXPIRED",
        description: "만료된 쿠폰",
        expirationDate: "2024-01-01",
        discountType: "fixed",
        discount: 5000,
        minimumAmount: 10000,
      };

      const result = getPossibleToUse({
        data: expiredCoupon,
        orderPrice: 50000,
        orderProducts: mockCartItems,
        deliveryPrice: 3000,
        selectedCoupons: [],
      });

      expect(result).toBe(false);
    });

    it("유효한 쿠폰은 사용할 수 있다", () => {
      const validCoupon: CouponType = {
        id: 1,
        code: "VALID",
        description: "유효한 쿠폰",
        expirationDate: "2025-12-31",
        discountType: "fixed",
        discount: 5000,
        minimumAmount: 10000,
      };

      const result = getPossibleToUse({
        data: validCoupon,
        orderPrice: 50000,
        orderProducts: mockCartItems,
        deliveryPrice: 3000,
        selectedCoupons: [],
      });

      expect(result).toBe(true);
    });
  });

  describe("고정 할인 쿠폰", () => {
    it("최소 주문 금액을 만족하면 사용 가능하다", () => {
      const result = getPossibleToUse({
        data: coupons[0],
        orderPrice: 100000,
        orderProducts: mockCartItems,
        deliveryPrice: 3000,
        selectedCoupons: [],
      });

      expect(result).toBe(true);
    });

    it("최소 주문 금액을 만족하지 않으면 사용 불가하다", () => {
      const result = getPossibleToUse({
        data: coupons[0],
        orderPrice: 50000,
        orderProducts: mockCartItems,
        deliveryPrice: 3000,
        selectedCoupons: [],
      });

      expect(result).toBe(false);
    });
  });

  describe("buyXgetY 쿠폰", () => {
    it("3개 이상 구매한 상품이 있으면 사용 가능하다", () => {
      const result = getPossibleToUse({
        data: coupons[1],
        orderPrice: 50000,
        orderProducts: mockCartItems,
        deliveryPrice: 3000,
        selectedCoupons: [],
      });

      expect(result).toBe(true);
    });

    it("3개 이상 구매한 상품이 없으면 사용 불가하다", () => {
      const lowQuantityItems: ResponseCartItem[] = [
        {
          id: 1,
          quantity: 1, // 3개 미만
          product: {
            id: 1,
            name: "상품1",
            price: 10000,
            imageUrl: "test.jpg",
            category: "테스트",
            quantity: 10,
          },
        },
        {
          id: 2,
          quantity: 2, // 3개 미만
          product: {
            id: 2,
            name: "상품2",
            price: 15000,
            imageUrl: "test2.jpg",
            category: "테스트",
            quantity: 5,
          },
        },
      ];

      const result = getPossibleToUse({
        data: coupons[1],
        orderPrice: 50000,
        orderProducts: lowQuantityItems,
        deliveryPrice: 3000,
        selectedCoupons: [],
      });

      expect(result).toBe(false);
    });
  });

  describe("무료 배송 쿠폰", () => {
    it("배송비가 있고 최소 주문 금액을 만족하면 사용 가능하다", () => {
      const result = getPossibleToUse({
        data: coupons[2],
        orderPrice: 50000,
        orderProducts: mockCartItems,
        deliveryPrice: 3000,
        selectedCoupons: [],
      });

      expect(result).toBe(true);
    });

    it("이미 배송비가 0이면 사용 불가하다", () => {
      const result = getPossibleToUse({
        data: coupons[2],
        orderPrice: 150000,
        orderProducts: mockCartItems,
        deliveryPrice: 0,
        selectedCoupons: [],
      });

      expect(result).toBe(false);
    });

    it("최소 주문 금액을 만족하지 않으면 사용 불가하다", () => {
      const freeShippingCoupon: CouponType = {
        id: 1,
        code: "FREESHIP",
        description: "무료 배송",
        expirationDate: "2025-12-31",
        discountType: "freeShipping",
        minimumAmount: 60000,
      };

      const result = getPossibleToUse({
        data: freeShippingCoupon,
        orderPrice: 30000,
        orderProducts: mockCartItems,
        deliveryPrice: 3000,
        selectedCoupons: [],
      });

      expect(result).toBe(false);
    });
  });
});
