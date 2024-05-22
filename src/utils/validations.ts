import { Coupon } from '@/types/coupon';

export const isCouponValid = (coupon: Coupon) => {
  const couponExpirationDate = new Date(coupon.expirationDate);
  const now = new Date();

  return couponExpirationDate >= now;
};
