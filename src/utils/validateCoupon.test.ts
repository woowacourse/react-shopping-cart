// src/__tests__/validateCoupon.test.ts
import { mockCoupons } from "../mocks/coupons";
import { expiredCoupons } from "../mocks/invalidCoupons";
import { Coupon } from "../types/coupons";
import { isValidCoupon } from "./validateCoupon";

describe("validateCoupon: 쿠폰 유효성 검사", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-05-23"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("쿠폰이 유효하면 true를 반환한다", () => {
    const validCoupon: Coupon = mockCoupons[0];

    expect(isValidCoupon(validCoupon)).toBe(true);
  });

  it.each(expiredCoupons)(
    "쿠폰이 만료되었으면 false를 반환한다",
    (expiredCoupon) => {
      expect(isValidCoupon(expiredCoupon)).toBe(false);
    }
  );
});
