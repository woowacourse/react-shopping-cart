import { Coupon } from '../types/coupon';

export function isExpired(coupon: Coupon): boolean {
  const today = new Date();
  const [y, m, d] = coupon.expirationDate.split('-').map(Number);
  return today >= new Date(y, m - 1, d);
}

export function isMiracleMorning(): boolean {
  const now = new Date();

  const start = new Date(now);
  start.setHours(4, 0, 0, 0);
  const end = new Date(now);
  end.setHours(7, 0, 0, 0);

  return now >= start && now <= end;
}
