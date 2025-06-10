import { Coupon } from '../../../types/coupon';

export function createCouponTypeGuard<T extends Coupon['discountType']>(type: T) {
  return (c: Coupon): c is Extract<Coupon, { discountType: T }> => c.discountType === type;
}
