import { Coupon } from '../../../types/Coupon.type';

export const sortCouponsByDiscountRate = (coupons: Coupon[]) => {
  return coupons
    .filter((coupon) => coupon.discountType === 'percentage')
    .concat(coupons.filter((coupon) => coupon.discountType !== 'percentage'));
};
