import { Coupon } from "../types";
import { useCouponFinder } from "./useCouponFinder";
import { useCouponValidator } from "./useCouponValidator";

export const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = useCouponValidator();

  const isCouponApplicable = (coupon: Coupon, totalAmount: number) => {
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || !isCouponValid(targetCoupon)) return false;

    if (targetCoupon.minimumAmount && totalAmount < targetCoupon.minimumAmount) {
      return false;
    }

    return true;
  };

  return {
    isCouponApplicable,
  };
};
