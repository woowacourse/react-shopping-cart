import { Coupon } from "../types/Coupon";

export function isCouponValid(
  coupon: Coupon,
  orderAmount: number,
  now: Date
): boolean {
  const expiration = new Date(`${coupon.expirationDate}T23:59:59`);
  if (expiration < now) return false;

  if ("minimumAmount" in coupon && orderAmount < coupon.minimumAmount) {
    return false;
  }
  if (coupon.code === "MIRACLESALE" && "availableTime" in coupon) {
    const [startH, startM] = coupon.availableTime.start.split(":").map(Number);
    const [endH, endM] = coupon.availableTime.end.split(":").map(Number);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    return nowMinutes >= startMinutes && nowMinutes < endMinutes;
  }

  return true;
}
