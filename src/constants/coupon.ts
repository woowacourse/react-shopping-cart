import { CouponDiscountType, CouponPriority } from '../types/coupon.type';

export const MAX_COUPON_COUNT = 2;

export const COUPON_PRIORITY: Record<CouponDiscountType, CouponPriority> = {
  fixed: 0,
  buyXgetY: 2,
  percentage: 1,
  freeShipping: 0,
};
