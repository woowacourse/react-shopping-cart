import { Coupon } from "../types/coupons";

export function isMetMinimumAmount(
  coupon: Coupon,
  orderAmount: number
): boolean {
  if ("minimumAmount" in coupon && coupon.minimumAmount) {
    return orderAmount >= coupon.minimumAmount;
  }
  return true;
}
