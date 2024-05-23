import { useCouponApplicabilityChecker } from './useCouponApplicabilityChecker';
import { Coupon } from '../types/coupon';

const useDiscountCalculator = () => {
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  // 고정 할인
  const calculateFixedDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }

    return coupon.discount ?? 0;
  };

  // 비율 할인
  const calculatePercentageDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }

    return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
  };

  // coupon 타입에 따라 반환값 분기처리
  const calculateDiscountAmount = (coupon: Coupon, totalAmount: number, now: Date = new Date()) => {
    if (!isCouponApplicable(coupon, totalAmount, now)) {
      return 0;
    }

    switch (coupon.discountType) {
      case 'fixed':
        return calculateFixedDiscount(coupon, totalAmount);
      case 'percentage':
        return calculatePercentageDiscount(coupon, totalAmount);
      default:
        return 0;
    }
  };

  return {
    calculateDiscountAmount,
  };
};

export default useDiscountCalculator;
