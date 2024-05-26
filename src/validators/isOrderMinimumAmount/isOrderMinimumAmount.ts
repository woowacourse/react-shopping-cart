import { CouponProps } from '../../types';

export const isOrderMinimumAmount = (
  coupon: CouponProps,
  totalAmount: number,
) => {
  if (coupon.minimumAmount && totalAmount < coupon.minimumAmount) {
    return false;
  }
  return true;
};
