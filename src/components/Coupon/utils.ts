import { CouponClint, CouponDiscountType } from '@/types/coupon';

export const isCheckedCoupon = (couponCheckList: CouponClint[], code: CouponDiscountType) => {
  const targetCoupon = couponCheckList.find((coupon) => coupon.code === code);
  return targetCoupon ? targetCoupon.isChecked : false;
};
