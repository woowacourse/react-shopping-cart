import { Coupon } from "../types";
import { isMinimumAmountSatisfied, isWithinAvailableTime } from "../utils/couponChecker";
import { couponValidator } from "../utils/couponValidator";
import { useCouponFinder } from "./useCouponFinder";

export const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = couponValidator();

  const isCouponApplicable = (coupon: Coupon, totalAmount: number, now: Date = new Date()) => {
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || !isCouponValid(targetCoupon)) return false;

    if (!isMinimumAmountSatisfied(targetCoupon, totalAmount)) {
      return false;
    }

    if (!isWithinAvailableTime(targetCoupon, now)) {
      return false;
    }

    return true;
  };

  return {
    isCouponApplicable,
  };
};
