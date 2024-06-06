import { Coupon, DiscountType } from "../types";
import { couponValidator } from "./couponValidator";

describe("couponValidator", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-05-20"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("만료일이 지난 쿠폰은 유효하지 않다", () => {
    const expiredCoupon: Coupon = {
      id: 1,
      code: "EXPIRED_COUPON",
      description: "만료된 쿠폰",
      expirationDate: "2024-05-01",
      discountType: DiscountType.Fixed,
      minimumAmount: 1000,
      discount: 500,
    };
    const { isCouponValid } = couponValidator();
    expect(isCouponValid(expiredCoupon)).toBe(false);
  });

  it("만료일이 지나지 않은 쿠폰은 유효하다", () => {
    const validCoupon: Coupon = {
      id: 2,
      code: "VALID_COUPON",
      description: "유효한 쿠폰",
      expirationDate: "2024-06-31",
      discountType: DiscountType.Fixed,
      minimumAmount: 1000,
      discount: 500,
    };
    const { isCouponValid } = couponValidator();
    expect(isCouponValid(validCoupon)).toBe(true);
  });
});
