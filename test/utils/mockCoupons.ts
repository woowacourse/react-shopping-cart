import { Coupon } from "../../src/apis/coupons";

export const createMockCoupon = (
  id: number,
  code: string,
  discountType: "fixed" | "percentage" | "buyXgetY" | "freeShipping",
  discount?: number,
  options?: Partial<Coupon>
): Coupon => ({
  id,
  code,
  description: `${code} 쿠폰`,
  expirationDate: "2099-12-31",
  discountType,
  discount,
  ...options,
});

export const defaultMockCoupons: Coupon[] = [
  createMockCoupon(1, "FIXED1000", "fixed", 1000, { minimumAmount: 5000 }),
  createMockCoupon(2, "PERCENT20", "percentage", 20),
  createMockCoupon(3, "FREESHIP", "freeShipping", undefined, {
    minimumAmount: 10000,
  }),
  createMockCoupon(4, "BOGO", "buyXgetY", undefined, {
    buyQuantity: 2,
    getQuantity: 1,
  }),
];
