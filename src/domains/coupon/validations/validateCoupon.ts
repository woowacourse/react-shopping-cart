import { Coupon } from "../types/response";

export const validateCoupon = (
  coupon: Coupon,
  orderPrice: number,
  currentDate: string = new Date().toISOString().split("T")[0],
  currentTime: string = new Date().toTimeString().substring(0, 8)
): boolean => {
  const isExpired = coupon.expirationDate < currentDate;
  if (isExpired) return false;

  const meetsMinimumAmount =
    !coupon.minimumAmount || orderPrice >= coupon.minimumAmount;
  if (!meetsMinimumAmount) return false;

  if (coupon.availableTime) {
    const { start, end } = coupon.availableTime;
    const isWithinTimeRange = currentTime >= start && currentTime <= end;
    if (!isWithinTimeRange) return false;
  }

  return true;
};
