import Coupon from '../models/coupon';

export function selectTopDiscountCoupons(
  coupons: Coupon[],
  limit = 2
): Coupon[] {
  return [...coupons]
    .filter((coupon) => !coupon.disable)
    .sort((a, b) => b.discountAmount - a.discountAmount)
    .slice(0, limit);
}
