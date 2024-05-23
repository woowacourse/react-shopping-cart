// src/__tests__/checkCouponConditions.test.ts

import { Coupon } from "../types/coupons";
import { isMetMinimumAmount } from "./checkApplicableCoupon";

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
      };

      expect(isMetMinimumAmount(coupon, 50)).toBe(true);
    });
  });
});
