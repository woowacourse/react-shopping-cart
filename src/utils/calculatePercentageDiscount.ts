import { PercentageDiscountCoupon } from "../types/type";
import { isValidExpiration } from "./isValidExpiration";

export const calculatePercentageDiscount = (
  orderPrice: number,
  coupon: PercentageDiscountCoupon
) => {
  if (!isValidExpiration(coupon.expirationDate)) return 0;

  const now = new Date();

  const [startHour, startMin, startSec] = coupon.availableTime.start
    .split(":")
    .map(Number);
  const [endHour, endMin, endSec] = coupon.availableTime.end
    .split(":")
    .map(Number);

  const today = new Date();
  const startTime = new Date(today.setHours(startHour, startMin, startSec, 0));
  const endTime = new Date(today.setHours(endHour, endMin, endSec, 0));

  if (now < startTime || now > endTime) return 0;

  return orderPrice * coupon.discount;
};
