import { CouponClient, CouponCode } from '@/types/coupon';

export const isCheckedCoupon = (couponCheckList: CouponClient[], code: CouponCode) => {
  const targetCoupon = couponCheckList.find((coupon) => coupon.code === code);

  return targetCoupon ? targetCoupon.isChecked : false;
};
