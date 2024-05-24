import couponValidator from './couponValidator';

import { CouponType } from '../type';
import CONDITION from '../constants/Condition';

const couponApplicabilityValidator = () => {
  const validateCouponAvailableTime = (coupon: CouponType, now: Date) => {
    if (coupon.availableTime) {
      const [startHour, startMinute, startSecond] = coupon.availableTime.start
        .split(':')
        .map(Number);

      const [endHour, endMinute, endSecond] = coupon.availableTime.end
        .split(':')
        .map(Number);

      const startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        startHour,
        startMinute,
        startSecond,
      );

      const endTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        endHour,
        endMinute,
        endSecond,
      );

      if (now < startTime || now > endTime) return false;
    }

    return true;
  };

  const validateFreeShippingCoupon = (
    coupon: CouponType,
    totalAmount: number,
  ) => {
    if (
      coupon.code === 'FREESHIPPING' &&
      totalAmount >= CONDITION.freeShippingFee
    ) {
      return false;
    }

    return true;
  };

  const validateCouponApplicability = (
    coupon: CouponType,
    totalAmount: number,
    now: Date = new Date(),
  ) => {
    const { validateCoupon } = couponValidator();

    if (!validateCoupon(coupon)) return false;

    if (coupon.minimumAmount && totalAmount < coupon.minimumAmount) {
      return false;
    }

    if (!validateCouponAvailableTime(coupon, now)) return false;

    if (!validateFreeShippingCoupon(coupon, totalAmount)) return false;

    return true;
  };

  return { validateCouponApplicability };
};

export default couponApplicabilityValidator;
