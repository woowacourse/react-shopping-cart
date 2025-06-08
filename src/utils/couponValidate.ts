import { CartItemProps } from '../types/cartItem';
import { Coupon, validatedCouponList } from '../types/coupon';

function isExpired(expirationDate: string): boolean {
  const today = new Date();
  const [y, m, d] = expirationDate.split('-').map(Number);
  return today <= new Date(y, m - 1, d);
}

function isMiracleMorning(start: string, end: string): boolean {
  const now = new Date();

  const startDate = new Date(now);
  startDate.setHours(
    Number(start.split(':')[0]),
    Number(start.split(':')[1]),
    0,
    0
  );
  const endDate = new Date(now);
  endDate.setHours(Number(end.split(':')[0]), Number(end.split(':')[1]), 0, 0);

  return now >= startDate && now <= endDate;
}

function isMinimumAmount(minimumAmount: number, subTotal: number): boolean {
  return subTotal >= minimumAmount;
}

function isQuantity(cartItems: CartItemProps[]): boolean {
  return cartItems.some((item) => item.quantity >= 2);
}

export function validateCoupons(
  couponList: Coupon[],
  subTotal: number,
  selectedItems: CartItemProps[]
): validatedCouponList[] {
  const validatedCouponList: validatedCouponList[] = [];

  couponList.forEach((coupon) => {
    let expiredFlag = !isExpired(coupon.expirationDate);

    if (coupon.description.includes('미라클모닝')) {
      expiredFlag = !isMiracleMorning(
        coupon.availableTime?.start || '',
        coupon.availableTime?.end || ''
      );
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

    validatedCouponList.push({ ...coupon, isExpired: expiredFlag });
  });

  return validatedCouponList;
}
