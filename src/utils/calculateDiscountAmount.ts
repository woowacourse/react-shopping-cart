import { CouponProps } from '../types';

export const calculateDiscountAmount = () => {
  const calculateFixedDiscount = (coupon: CouponProps) => {
    return coupon.discount ?? 0;
  };

  const calculatePercentageDiscount = (
    coupon: CouponProps,
    orderPrice: number,
  ) => {
    if (coupon.discount) return orderPrice * (coupon.discount / 100);
    return 0;
  };

  const getCouponDiscountValueByType = (
    coupon: CouponProps,
    orderPrice: number,
  ) => {
    switch (coupon.discountType) {
      case 'fixed':
        return calculateFixedDiscount(coupon);
      case 'percentage':
        return calculatePercentageDiscount(coupon, orderPrice);
      default:
        return 0;
    }
  };

  return {
    getCouponDiscountValueByType,
  };
};
