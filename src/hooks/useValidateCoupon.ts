import { AvailableCoupon, Coupon } from '../types/coupon';
import { isExpired, isMiracleMorning, isMinimumAmount } from '../utils/coupon';

function useValidateCoupon(couponList: Coupon[], subTotal: number) {
  const availableCouponList: AvailableCoupon[] = [];

  couponList.forEach((coupon) => {
    let expiredFlag = isExpired(coupon.expirationDate);

    if (coupon.description.includes('미라클모닝')) {
      expiredFlag = !isMiracleMorning();
    }

    if (
      coupon.minimumAmount !== undefined &&
      !isMinimumAmount(coupon.minimumAmount, subTotal)
    ) {
      expiredFlag = true;
    }

    availableCouponList.push({ ...coupon, isExpired: expiredFlag });
  });

  return { availableCouponList };
}

export default useValidateCoupon;
