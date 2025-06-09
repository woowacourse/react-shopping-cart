import { describe, expect, it } from "vitest";
import { FixedDiscountCoupon } from "../../../src/type/Coupons";
import { validateFixedDiscountCoupon } from "../../../src/util/coupons/FixedDiscountCoupon/validate";

describe("validateFixedDiscountCoupon", () => {
  const baseFixedCoupon: FixedDiscountCoupon = {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  };

  it("주문 금액이 최소 금액과 같으면 유효하다 (경계값: 100,000원)", () => {
    const totalPrice = 100000;
    const coupon = baseFixedCoupon; // baseFixedCoupon의 minimumAmount가 100000
    expect(validateFixedDiscountCoupon({ totalPrice, coupon })).toBe(true);
  });

  it("주문 금액이 최소 금액보다 1원이라도 크면 유효하다 (경계값 초과: 100,001원)", () => {
    const totalPrice = 100001;
    const coupon = baseFixedCoupon;
    expect(validateFixedDiscountCoupon({ totalPrice, coupon })).toBe(true);
  });

  it("주문 금액이 최소 금액보다 1원이라도 작으면 유효하지 않다 (경계값 미달: 99,999원)", () => {
    const totalPrice = 99999;
    const coupon = baseFixedCoupon;
    expect(validateFixedDiscountCoupon({ totalPrice, coupon })).toBe(false);
  });
});
