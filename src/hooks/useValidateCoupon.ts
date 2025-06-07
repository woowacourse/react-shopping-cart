import { AvailableCoupon, Coupon } from '../types/coupon';
import { isExpired, isMiracleMorning } from '../utils/coupon';

function useValidateCoupon(couponList: Coupon[]) {
  const availableCouponList: AvailableCoupon[] = [];

  couponList.forEach((coupon) => {
    const expired = isExpired(coupon);

    if (coupon.description.includes('미라클모닝')) {
      const nowExpired = !isMiracleMorning();
      availableCouponList.push({ ...coupon, isExpired: nowExpired });
    } else {
      availableCouponList.push({ ...coupon, isExpired: expired });
    }
  });

  return { availableCouponList };
}

export default useValidateCoupon;
