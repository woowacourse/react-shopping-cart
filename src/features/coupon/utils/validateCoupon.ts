import { Coupon } from '../types/coupon';
import { validateAvailableTime } from './validateAvailableTime';
import { validateExpirationDate } from './validateExpirationDate';
import { validateMinimumAmount } from './validateMinimumAmount';

export const validateCoupon = (coupon: Coupon, totalPrice: number, currentDate: Date): boolean => {
  return (
    validateExpirationDate(currentDate, coupon.expirationDate) &&
    (!coupon.availableTime || validateAvailableTime(currentDate, coupon.availableTime)) &&
    (!coupon.minimumAmount || validateMinimumAmount(totalPrice, coupon))
  );
};
