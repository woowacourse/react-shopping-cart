import { CouponContent } from '@/api/type';

export const isCouponValid = (coupon: CouponContent) => {
  const now = new Date();
  const exp = new Date(coupon.expirationDate);
  return exp >= now;
};
