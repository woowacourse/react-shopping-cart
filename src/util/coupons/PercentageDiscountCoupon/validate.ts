import { PercentageDiscountCoupon } from "../../../type/Coupons";
import { getTimes } from "./getTimes";

export const validatePercentageDiscountCoupon = ({
  coupon,
  time: { hour: currentHour, min: currentMin, sec: currentSec },
}: {
  coupon: PercentageDiscountCoupon;
  time: { hour: number; min: number; sec: number };
}) => {
  const {
    availableTime: { start, end },
  } = coupon;

  const { hour: startHour, min: startMin, sec: startSec } = getTimes(start);
  const { hour: endHour, min: endMin, sec: endSec } = getTimes(end);

  const isWithinTimeRange =
    (currentHour > startHour ||
      (currentHour === startHour &&
        currentMin >= startMin &&
        currentSec >= startSec)) &&
    (currentHour < endHour ||
      (currentHour === endHour && currentMin < endMin && currentSec < endSec));

  return isWithinTimeRange;
};
