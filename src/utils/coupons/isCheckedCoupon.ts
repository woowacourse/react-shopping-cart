import { CouponClient, CouponCodeType } from '@/types/coupon';

export const isCheckedCoupon = (couponCheckList: CouponClient[], code: CouponCodeType) => {
  const targetCoupon = couponCheckList.find((coupon) => coupon.code === code);

  return targetCoupon ? targetCoupon.isChecked : false;
};
