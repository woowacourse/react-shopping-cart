import {
  isBuyXGetYCoupon,
  isFixedDiscountCoupon,
  isFreeShippingCoupon,
  isPercentageDiscountCoupon,
} from ".";
import { TEST_COUPON } from "./couponTypeGuards.testData";

describe("Coupon Type Guards", () => {
  describe("isFixedDiscountCoupon", () => {
    it("고정 할인 쿠폰에 대해 true를 반환한다", () => {
      expect(isFixedDiscountCoupon(TEST_COUPON.fixed)).toBe(true);
    });

    it("다른 쿠폰 타입에 대해 false를 반환한다", () => {
      expect(isFixedDiscountCoupon(TEST_COUPON.percentage)).toBe(false);
      expect(isFixedDiscountCoupon(TEST_COUPON.buyXgetY)).toBe(false);
      expect(isFixedDiscountCoupon(TEST_COUPON.freeShipping)).toBe(false);
    });
  });

  describe("isPercentageDiscountCoupon", () => {
    it("비율 할인 쿠폰에 대해 true를 반환한다", () => {
      expect(isPercentageDiscountCoupon(TEST_COUPON.percentage)).toBe(true);
    });

    it("다른 쿠폰 타입에 대해 false를 반환한다", () => {
      expect(isPercentageDiscountCoupon(TEST_COUPON.fixed)).toBe(false);
      expect(isPercentageDiscountCoupon(TEST_COUPON.buyXgetY)).toBe(false);
      expect(isPercentageDiscountCoupon(TEST_COUPON.freeShipping)).toBe(false);
    });
  });

  describe("isBuyXGetYCoupon", () => {
    it("Buy X Get Y 쿠폰에 대해 true를 반환한다", () => {
      expect(isBuyXGetYCoupon(TEST_COUPON.buyXgetY)).toBe(true);
    });

    it("다른 쿠폰 타입에 대해 false를 반환한다", () => {
      expect(isBuyXGetYCoupon(TEST_COUPON.fixed)).toBe(false);
      expect(isBuyXGetYCoupon(TEST_COUPON.percentage)).toBe(false);
      expect(isBuyXGetYCoupon(TEST_COUPON.freeShipping)).toBe(false);
    });
  });

  describe("isFreeShippingCoupon", () => {
    it("무료 배송 쿠폰에 대해 true를 반환한다", () => {
      expect(isFreeShippingCoupon(TEST_COUPON.freeShipping)).toBe(true);
    });

    it("다른 쿠폰 타입에 대해 false를 반환한다", () => {
      expect(isFreeShippingCoupon(TEST_COUPON.fixed)).toBe(false);
      expect(isFreeShippingCoupon(TEST_COUPON.percentage)).toBe(false);
      expect(isFreeShippingCoupon(TEST_COUPON.buyXgetY)).toBe(false);
    });
  });
});
