import { useRecoilValue } from "recoil";
import { useCouponFinder, useCouponValidator } from ".";
import { Coupon } from "../../types";
import { orderListTotalQuantitySelector } from "./../../recoil/selectors";

const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = useCouponValidator();
  const orderListTotalQuantity = useRecoilValue(orderListTotalQuantitySelector);

  const isCouponApplicable = ({
    coupon,
    totalAmount,
    now = new Date(),
  }: {
    coupon?: Coupon;
    totalAmount: number;
    now?: Date;
  }) => {
    if (!coupon) return false;

    const targetCoupon = findCouponByCode(coupon.code);

    if (!targetCoupon || !isCouponValid(targetCoupon)) return false;

    if (targetCoupon.getQuantity && targetCoupon.buyQuantity) {
      if (
        orderListTotalQuantity ===
        targetCoupon.buyQuantity + targetCoupon.getQuantity
      ) {
        return true;
      }
      return false;
    }

    if (
      targetCoupon.minimumAmount &&
      totalAmount < targetCoupon.minimumAmount
    ) {
      return false;
    }

    if (targetCoupon.availableTime) {
      const [startHour, startMinute, startSecond] =
        targetCoupon.availableTime.start.split(":").map(Number);

      const [endHour, endMinute, endSecond] = targetCoupon.availableTime.end
        .split(":")
        .map(Number);

      const startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        startHour,
        startMinute,
        startSecond
      );

      const endTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        endHour,
        endMinute,
        endSecond
      );

      if (now < startTime || now > endTime) {
        return false;
      }
    }

    return true;
  };

  return {
    isCouponApplicable,
  };
};

export default useCouponApplicabilityChecker;
