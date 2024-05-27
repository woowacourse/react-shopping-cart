// src/__tests__/checkCouponConditions.test.ts

import { CartItem } from "../types/cartItems";
import { BOGOCoupon, Coupon, PercentageDiscountCoupon } from "../types/coupons";
import {
  checkBuyQuantity,
  isAvailableTime,
  isMetMinimumAmount,
} from "./checkApplicableCoupon";

describe("checkApplicableCoupon: 쿠폰 적용 조건 검사", () => {
  describe("최소 주문 금액 조건 검사", () => {
    it("카트 총 금액이 최소 주문 금액을 충족하면 true를 반환한다", () => {
      const coupon: Coupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discountType: "fixed",
        expirationDate: "2199-12-31",
        discount: 5000,
        minimumAmount: 10000,
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };

      expect(isMetMinimumAmount(coupon, 10000)).toBe(true);
    });

    it("카트 총 금액이 최소 주문 금액을 충족하지 않으면 false를 반환한다", () => {
      const coupon: Coupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discountType: "fixed",
        expirationDate: "2199-12-31",
        discount: 5000,
        minimumAmount: 10000,
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };

      expect(isMetMinimumAmount(coupon, 9999)).toBe(false);
    });

    it("쿠폰에 최소 주문 금액 조건이 없으면 true를 반환한다", () => {
      const coupon: Coupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discountType: "fixed",
        expirationDate: "2199-12-31",
        discount: 5000,
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };

      expect(isMetMinimumAmount(coupon, 50)).toBe(true);
    });
  });

  describe("사용 가능 시간 조건 검사", () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("현재 시간이 사용 가능 시간 범위 내에 있으면 true를 반환한다", () => {
      jest.setSystemTime(new Date("2024-05-20 05:00:00"));

      const coupon: PercentageDiscountCoupon = {
        id: 4,
        code: "MIRACLESALE",
        description: "미라클모닝 30% 할인 쿠폰",
        discount: 30,
        discountType: "percentage",
        availableTime: {
          start: "04:00:00",
          end: "07:00:00",
        },
        expirationDate: "2024-07-31",
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };

      expect(isAvailableTime(coupon)).toBe(true);
    });

    it("현재 시간이 사용 가능 시간 범위 외에 있으면 false를 반환한다", () => {
      jest.setSystemTime(new Date("2024-05-20 07:01:00"));

      const coupon: PercentageDiscountCoupon = {
        id: 4,
        code: "MIRACLESALE",
        description: "미라클모닝 30% 할인 쿠폰",
        discount: 30,
        discountType: "percentage",
        availableTime: {
          start: "04:00:00",
          end: "07:00:00",
        },
        expirationDate: "2024-07-31",
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };

      expect(isAvailableTime(coupon)).toBe(false);
    });
  });

  describe("주문 수량 조건 검사", () => {
    it("장바구니의 주문 수량이 조건을 충족하면 true를 반환한다", () => {
      const coupon: BOGOCoupon = {
        id: 2,
        code: "BOGO",
        description: "2개 구매 시 1개 무료 쿠폰",
        discountType: "buyXgetY",
        buyQuantity: 2,
        getQuantity: 1,
        expirationDate: "2024-04-30",
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 3,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];

      expect(checkBuyQuantity(coupon, cartItems)).toBe(true);
    });

    it("장바구니의 주문 수량이 조건을 충족하지 않으면 false를 반환한다", () => {
      const coupon: BOGOCoupon = {
        id: 2,
        code: "BOGO",
        description: "2개 구매 시 1개 무료 쿠폰",
        discountType: "buyXgetY",
        buyQuantity: 2,
        getQuantity: 1,
        expirationDate: "2024-04-30",
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 1,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
      ];

      expect(checkBuyQuantity(coupon, cartItems)).toBe(false);
    });
  });
});
