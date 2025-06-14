import { describe, it, expect } from "vitest";
import { FreeShippingCoupon } from "../../../src/type/Coupons";
import { validateFreeShippingCoupon } from "../../../src/util/coupons/FreeShippingCoupon/validate";

const baseFreeShippingCoupon: FreeShippingCoupon = {
  id: 3,
  code: "FREESHIPPING",
  description: "5만원 이상 구매 시 무료 배송 쿠폰",
  expirationDate: "2025-08-31",
  minimumAmount: 50000,
  discountType: "freeShipping",
};

describe("validateFreeShippingCoupon", () => {
  it("주문 금액이 최소 금액과 같으면 유효하다 (경계값: 50,000원)", () => {
    const { minimumAmount } = baseFreeShippingCoupon;
    const totalPrice = minimumAmount;
    const coupon = baseFreeShippingCoupon;

    expect(validateFreeShippingCoupon({ totalPrice, coupon })).toBe(true);
  });

  it("주문 금액이 최소 금액보다 1원이라도 크면 유효하다 (경계값 초과: 50,001원)", () => {
    const { minimumAmount } = baseFreeShippingCoupon;
    const totalPrice = minimumAmount + 1;
    const coupon = baseFreeShippingCoupon;

    expect(validateFreeShippingCoupon({ totalPrice, coupon })).toBe(true);
  });

  it("주문 금액이 최소 금액보다 1원이라도 작으면 유효하지 않다 (경계값 미달: 49,999원)", () => {
    const { minimumAmount } = baseFreeShippingCoupon;
    const totalPrice = minimumAmount - 1;
    const coupon = baseFreeShippingCoupon;

    expect(validateFreeShippingCoupon({ totalPrice, coupon })).toBe(false);
  });
});
