import { FREE_DELIVERY_THRESHOLD } from '../constants/ShoppingCart';
import { Coupon } from '../types/coupon';

const isCouponExpired = (expirationDate: string) => {
  const today = new Date();
  const expiration = new Date(expirationDate);
  return expiration < today;
};

const isCouponApplicable = (
  coupon: Coupon,
  totalAmount: number,
  now = new Date(),
) => {
  if (!coupon || isCouponExpired(coupon.expirationDate)) return false;

  if (coupon.minimumAmount && totalAmount < coupon.minimumAmount) {
    return false;
  }

  if (
    coupon.discountType === 'freeShipping' &&
    totalAmount > FREE_DELIVERY_THRESHOLD
  ) {
    return false;
  }

  if (coupon.availableTime) {
    const [startHour, startMinute, startSecond] = coupon.availableTime.start
      .split(':')
      .map(Number);

    const [endHour, endMinute, endSecond] = coupon.availableTime.end
      .split(':')
      .map(Number);

    const startTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      startHour,
      startMinute,
      startSecond,
    );

    const endTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      endHour,
      endMinute,
      endSecond,
    );

    if (now < startTime || now > endTime) {
      return false;
    }
  }
  return true;
};
export default isCouponApplicable;
