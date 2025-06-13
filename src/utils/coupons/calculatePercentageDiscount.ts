import { PercentageDiscountCoupon } from "../../types/type";
import { splitByDelimiter } from "../splitByDelimiter";
import { isValidExpiration } from "./isValidExpiration";

export const calculatePercentageDiscount = (
  price: number,
  coupon: PercentageDiscountCoupon
) => {
  if (!isValidExpiration(coupon.expirationDate)) return 0;

  const now = new Date();
  const availableTime = coupon.availableTime;

  const [startHour, startMin, startSec] = splitByDelimiter(
    availableTime.start,
    ":"
  ).map(Number);
  const [endHour, endMin, endSec] = splitByDelimiter(
    availableTime.end,
    ":"
  ).map(Number);

  const today = new Date();
  const startTime = new Date(today.setHours(startHour, startMin, startSec, 0));
  const endTime = new Date(today.setHours(endHour, endMin, endSec, 0));

  if (now < startTime || now > endTime) return 0;

  return Math.floor((price * coupon.discount) / 100);
};
