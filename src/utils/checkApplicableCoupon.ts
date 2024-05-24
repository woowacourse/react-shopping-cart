import { Coupon, RawCoupon } from "../types/coupons";

export function isMetMinimumAmount(
  coupon: Coupon | RawCoupon,
  orderAmount: number
): boolean {
  if ("minimumAmount" in coupon && coupon.minimumAmount) {
    return orderAmount >= coupon.minimumAmount;
  }
  return true;
}
