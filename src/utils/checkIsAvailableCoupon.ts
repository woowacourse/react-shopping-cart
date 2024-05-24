import {
  BuyXGetYCoupon,
  CartItem,
  Coupon,
  FixedDiscountCoupon,
  FreeShippingCoupon,
  PercentageDiscountCoupon,
} from '../type';
import { getHHColonMMtoMinutes, iso8601ToDate } from './translateFormat';

import getLastTimeDate from './getLastTimeDate';
import getNowMinutes from './getNowMinutes';

const checkIsAvailableFixedCoupon = (fixedCoupon: FixedDiscountCoupon, itemAmount: number) => {
  return itemAmount >= fixedCoupon.minimumAmount;
};

const checkIsAvailableBuyXgetYCoupon = (buyXgetYCoupon: BuyXGetYCoupon, items: CartItem[]) => {
  return items.some((item) => item.quantity >= buyXgetYCoupon.buyQuantity);
};

const checkIsAvailableFreeShippingCoupon = (
  freeShippingCoupon: FreeShippingCoupon,
  itemAmount: number,
  deliveryFee: number,
) => {
  if (deliveryFee === 0) return false;
  return itemAmount >= freeShippingCoupon.minimumAmount;
};

const checkIsAvailablePercentageCoupon = (percentageCoupon: PercentageDiscountCoupon) => {
  const nowMinutes = getNowMinutes();
  const couponStartMinutes = getHHColonMMtoMinutes(
    percentageCoupon.availableTime.start.slice(0, 5),
  );
  const couponEndMinutes = getHHColonMMtoMinutes(percentageCoupon.availableTime.end.slice(0, 5));
  return couponStartMinutes <= nowMinutes && nowMinutes <= couponEndMinutes;
};

export default function checkIsAvailableCoupon(
  coupon: Coupon,
  items: CartItem[],
  deliveryFee: number,
) {
  const expirationDate = getLastTimeDate(iso8601ToDate(coupon.expirationDate));
  if (expirationDate < new Date()) return false;

  const itemAmount = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  if (coupon.discountType === 'fixed') return checkIsAvailableFixedCoupon(coupon, itemAmount);
  if (coupon.discountType === 'buyXgetY') return checkIsAvailableBuyXgetYCoupon(coupon, items);
  if (coupon.discountType === 'freeShipping')
    return checkIsAvailableFreeShippingCoupon(coupon, itemAmount, deliveryFee);
  if (coupon.discountType === 'percentage') return checkIsAvailablePercentageCoupon(coupon);

  return false;
}
