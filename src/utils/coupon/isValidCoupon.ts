import { Coupon } from '../../types/coupon.type';

const isExpired = (baseDate: Date, comparisonDate: Date) => {
  return baseDate > comparisonDate;
};

export const isValidCoupon = (coupon: Coupon) => {
  const today = new Date();
  const expiredDate = new Date(coupon.expirationDate);

  return !isExpired(today, expiredDate);
};
