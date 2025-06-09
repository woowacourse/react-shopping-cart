import { describe, it, expect } from "vitest";
import { PercentageDiscountCoupon } from "../../../src/type/Coupons";
import { calculatePercentageDiscountCoupon } from "../../../src/util/coupons/PercentageDiscountCoupon/calculate";

const basePercentageDiscountCoupon: PercentageDiscountCoupon = {
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
};

describe("calculatePercentageDiscountCoupon", () => {
  it("기본 할인율(30%)로 정확히 할인 금액을 계산해야 한다", () => {
    const totalPrice = 100000;
    const expectedDiscount =
      totalPrice * (basePercentageDiscountCoupon.discount / 100);
    const coupon = basePercentageDiscountCoupon;
    expect(calculatePercentageDiscountCoupon({ totalPrice, coupon })).toBe(
      expectedDiscount
    );
  });

  it("총 금액이 0원일 때 할인 금액은 0이어야 한다", () => {
    const totalPrice = 0;
    const coupon = basePercentageDiscountCoupon;
    expect(calculatePercentageDiscountCoupon({ totalPrice, coupon })).toBe(0);
  });

  it("총 금액이 아주 작은 양수 값일 때 정확히 할인 금액을 계산해야 한다", () => {
    const totalPrice = 1;
    const coupon = basePercentageDiscountCoupon;
    expect(calculatePercentageDiscountCoupon({ totalPrice, coupon })).toBe(0.3);
  });

  it("할인율이 0%일 때 할인 금액은 0이어야 한다", () => {
    const totalPrice = 50000;
    const coupon = { ...basePercentageDiscountCoupon, discount: 0 };
    expect(calculatePercentageDiscountCoupon({ totalPrice, coupon })).toBe(0);
  });

  it("할인율이 100%일 때 총 금액 전체가 할인되어야 한다", () => {
    const totalPrice = 50000;
    const coupon = { ...basePercentageDiscountCoupon, discount: 100 };
    expect(calculatePercentageDiscountCoupon({ totalPrice, coupon })).toBe(
      50000
    );
  });
});
