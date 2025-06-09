import { describe, expect, it } from "vitest";
import { FixedDiscountCoupon } from "../../../src/type/Coupons";
import { calculateFixedDiscountCoupon } from "../../../src/util/coupons/FixedDiscountCoupon/calculate";

describe("calculateFixedDiscountCoupon", () => {
  const baseFixedCoupon: FixedDiscountCoupon = {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  };

  it("할인 금액이 5000원이면 5000원을 반환해야 한다", () => {
    const coupon = { ...baseFixedCoupon, discount: 5000 };
    expect(calculateFixedDiscountCoupon({ coupon })).toBe(5000);
  });
});
