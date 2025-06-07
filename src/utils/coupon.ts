import { Coupon } from '../types/coupon';

export function isExpired(coupon: Coupon): boolean {
  const today = new Date();
  const [y, m, d] = coupon.expirationDate.split('-').map(Number);
  return today >= new Date(y, m - 1, d);
}
