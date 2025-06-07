import { CartItemProps } from '../types/cartItem';
import { AvailableCoupon, Coupon } from '../types/coupon';
import {
  isExpired,
  isMiracleMorning,
  isMinimumAmount,
  isQuantity,
} from '../utils/coupon';

function useValidateCoupon(
  couponList: Coupon[],
  subTotal: number,
  selectedItems: CartItemProps[]
) {
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

    if (coupon.buyQuantity !== undefined && coupon.getQuantity !== undefined) {
      expiredFlag = !isQuantity(selectedItems);
    }

    availableCouponList.push({ ...coupon, isExpired: expiredFlag });
  });

  return { availableCouponList };
}

export default useValidateCoupon;
