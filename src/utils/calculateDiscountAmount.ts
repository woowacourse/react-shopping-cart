import { CouponProps } from '../types';

export const calculateDiscountAmount = () => {
  const calculateFixedDiscount = (coupon: CouponProps) => {
    return coupon.discount ?? 0;
  };

  const getCouponDiscountValueByType = (coupon: CouponProps) => {
    switch (coupon.discountType) {
      case 'fixed':
        return calculateFixedDiscount(coupon);
      default:
        return 0;
    }
  };

  return {
    getCouponDiscountValueByType,
  };
};
