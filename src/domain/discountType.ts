import { Coupon } from '@appTypes/orderConfirm';
import { CartItem } from '@appTypes/shoppingCart';
import { PRICE } from '@constants/shippingCart';
import { createDateTime } from '@utils/date';

export const isValidFreeShippingCondition = (coupon: Coupon, shippingPrice: number) =>
  coupon.discountType === 'freeShipping' && shippingPrice === PRICE.shippingFee.free;

export const isValidMinimumPriceCondition = (coupon: Coupon, totalPrice: number) =>
  coupon?.minimumAmount && totalPrice >= coupon.minimumAmount;

export const isValidTimeCondition = (coupon: Coupon, now = new Date()) => {
  if (!coupon.availableTime) return false;

  const startTime = createDateTime(coupon.availableTime.start);

  const endTime = createDateTime(coupon.availableTime.end);

  if (now < startTime || now > endTime) return false;

  return true;
};

export const isValidTwoPlusOneCondition = (selectedCartItems: CartItem[]) =>
  selectedCartItems.some((selectedCartItem) => selectedCartItem.quantity >= 3);
