import useCouponFinder from '../useCouponFinder/useCouponFinder';

import { Coupon } from '@/types/coupon';
import { isCouponUsableTime, isCouponValid, isOverMinimumOrderAmount } from '@/utils/validations';

const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();

  const isCouponApplicable = (coupon: Coupon, totalAmount: number, now: Date = new Date()) => {
    if (!findCouponByCode(coupon.code) || !isCouponValid(coupon)) return false;

    if (coupon.minimumAmount && !isOverMinimumOrderAmount(coupon, totalAmount)) return false;

    if (coupon.availableTime && !isCouponUsableTime(coupon, now)) return false;

    return true;
  };

  return { isCouponApplicable };
};

export default useCouponApplicabilityChecker;
