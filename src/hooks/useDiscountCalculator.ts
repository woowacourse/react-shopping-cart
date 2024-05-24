import { Coupon } from '../types/Coupon';

export const useDiscountCalculator = () => {
  // const { isCouponApplicable } = useCouponApplicabilityChecker();

  /**
   * 고정값을 할인하는 쿠폰의 할인 금액 반환
   * @returns { number }
   */
  const calculateFixedDiscount = (coupon: Coupon, totalAmount: number) => {
    // if (!isCouponApplicable(coupon, totalAmount)) {
    //   return 0;
    // }
    return coupon.discount ?? 0;
  };

  /**
   * 퍼센트 할인하는 쿠폰의 할인 금액 반환
   * @returns { number }
   */
  const calculatePercentageDiscount = (coupon: Coupon, totalAmount: number) => {
    // if (!isCouponApplicable(coupon, totalAmount)) {
    //   return 0;
    // }
    return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
  };

  /**
   * 쿠폰과 총 금액을 받고, 쿠폰이 유효한지 확인한 뒤
   * 쿠폰의 discountType에 따라 할인되는 금액을 반환
   * @returns { number }
   */
  const calculateDiscountAmount = (
    coupon: Coupon,
    totalAmount: number,
    now: Date = new Date(),
  ) => {
    // if (!isCouponApplicable(coupon, totalAmount, now)) {
    //   return 0;
    // }

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
