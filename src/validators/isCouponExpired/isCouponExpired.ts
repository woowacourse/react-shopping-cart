import { CouponProps } from '../../types';

export const isCouponExpired = (coupon: CouponProps) => {
  const today = new Date();
  const expiration = new Date(coupon.expirationDate);
  const isExpired = !(expiration < today);
  return isExpired;
};
