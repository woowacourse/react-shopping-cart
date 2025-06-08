import { PercentageDiscountCoupon } from "../../../type/Coupons";
import { validateExpirationDate } from "../validateCoupons";
import { getTimes } from "./getTimes";

export const validatePercentageDiscountCoupon = ({
  coupon,
}: {
  coupon: PercentageDiscountCoupon;
}) => {
  const {
    availableTime: { start, end },
    expirationDate,
  } = coupon;

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMin = currentDate.getMinutes();
  const currentSec = currentDate.getSeconds();

  const { hour: startHour, min: startMin, sec: startSec } = getTimes(start);
  const { hour: endHour, min: endMin, sec: endSec } = getTimes(end);

  const isWithinTimeRange =
    (currentHour > startHour ||
      (currentHour === startHour &&
        currentMin >= startMin &&
        currentSec >= startSec)) &&
    (currentHour < endHour ||
      (currentHour === endHour && currentMin < endMin && currentSec < endSec));

  return isWithinTimeRange && validateExpirationDate(expirationDate);
};
