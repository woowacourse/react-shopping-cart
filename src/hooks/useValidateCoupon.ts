import { AvailableCoupon, Coupon } from '../types/coupon';
import { isExpired } from '../utils/coupon';

function useValidateCoupon(couponList: Coupon[]) {
  const availableCouponList: AvailableCoupon[] = [];

  couponList.forEach((coupon) => {
    if (!isExpired(coupon)) {
      availableCouponList.push({ ...coupon, isExpired: false });
    } else {
      availableCouponList.push({ ...coupon, isExpired: true });
    }

    if (coupon.description.includes('미라클모닝')) {
      availableCouponList.push({ ...coupon, isExpired: true });
    }
  });

  return { availableCouponList };
}

export default useValidateCoupon;
