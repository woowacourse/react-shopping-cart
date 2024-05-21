import { Coupon } from "../types/coupon";

export function isCouponExpired(expirationDate: string): boolean {
  const today = new Date();
  const expiration = new Date(expirationDate);
  return expiration < today;
}

export function isCouponValid(coupon: Coupon): boolean {
  return !isCouponExpired(coupon.expirationDate);
}
