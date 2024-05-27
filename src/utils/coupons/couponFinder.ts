import { Coupon } from '@/types/coupon';

export const couponFinder = (couponList: Coupon[]) => {
  const findCouponByCode = (code: string) => {
    return couponList.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};
