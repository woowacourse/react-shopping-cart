import { Coupon, RawCoupon } from "../types/coupons";

const isExpiredCoupon = (expirationDate: string) => {
  const today = new Date();
  const expiration = new Date(expirationDate);
  return expiration < today;
};

export const isValidCoupon = (coupon: RawCoupon | Coupon) => {
  return !isExpiredCoupon(coupon.expirationDate);
};
