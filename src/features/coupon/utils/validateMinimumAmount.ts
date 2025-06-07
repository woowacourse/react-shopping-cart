import { Coupon } from '../types/coupon';

export const validateMinimumAmount = (totalPrice: number, coupon: Coupon) => {
  if (!coupon.minimumAmount) return false;
  return totalPrice < coupon.minimumAmount;
};
