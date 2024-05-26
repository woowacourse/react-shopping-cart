import { CartItemType, CouponType } from '../../types';

export const validateExpiration = (expirationDate: string) => {
  const today = new Date();
  const couponExpirationDate = new Date(expirationDate);
  return today < couponExpirationDate;
};

export const isOverMinOrderAmountCoupon = (orderAmount: number, coupon: CouponType) => {
  if (!coupon.minimumAmount) return false;
  if (orderAmount < coupon.minimumAmount) return false;
  return true;
};

export const isOverMinQuantityCoupon = (checkoutProducts: CartItemType[], minQuantity: number) => {
  return checkoutProducts.some((product) => product.quantity >= minQuantity);
};

export const isWithinAvailableTime = (coupon: CouponType): boolean => {
  if (!coupon.availableTime) return false;
  const { start, end } = coupon.availableTime;

  const now = new Date();

  const nowTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  const [startHours, startMinutes, startSeconds] = start.split(':').map(Number);
  const startTime = startHours * 3600 + startMinutes * 60 + startSeconds;

  const [endHours, endMinutes, endSeconds] = end.split(':').map(Number);
  const endTime = endHours * 3600 + endMinutes * 60 + endSeconds;

  return nowTime >= startTime && nowTime <= endTime;
};
