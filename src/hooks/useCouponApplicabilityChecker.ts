import {
  Coupon,
  DiscountType,
  FixedDiscountCoupon,
  FreeShippingCoupon,
  PercentageDiscountCoupon,
} from "../types";
import { couponValidator } from "../utils/couponValidator";
import { useCouponFinder } from "./useCouponFinder";

export const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = couponValidator();

  const isFixedDiscountCoupon = (coupon: Coupon): coupon is FixedDiscountCoupon => {
    return coupon.discountType === DiscountType.Fixed;
  };

  const isFreeShippingCoupon = (coupon: Coupon): coupon is FreeShippingCoupon => {
    return coupon.discountType === DiscountType.FreeShipping;
  };

  const isPercentageDiscountCoupon = (coupon: Coupon): coupon is PercentageDiscountCoupon => {
    return coupon.discountType === DiscountType.Percentage;
  };

  const isCouponApplicable = (coupon: Coupon, totalAmount: number, now: Date = new Date()) => {
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || !isCouponValid(targetCoupon)) return false;

    if (
      (isFixedDiscountCoupon(targetCoupon) || isFreeShippingCoupon(targetCoupon)) &&
      targetCoupon.minimumAmount &&
      totalAmount < targetCoupon.minimumAmount
    ) {
      return false;
    }

    if (isPercentageDiscountCoupon(targetCoupon) && targetCoupon.availableTime) {
      const [startHour, startMinute, startSecond] = targetCoupon.availableTime.start
        .split(":")
        .map(Number);

      const [endHour, endMinute, endSecond] = targetCoupon.availableTime.end.split(":").map(Number);

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
