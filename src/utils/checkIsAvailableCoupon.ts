import { CartItem, Coupon } from '../types';
import getOrderPrice from './getOrderPrice';

const checkIsAvailableCoupon = (
  coupon: Coupon,
  checkedCartItems: CartItem[],
  deliveryPrice: number
) => {
  if (checkIsNotOverMin(coupon, checkedCartItems)) return false;
  if (checkIsStaleCouponNow(coupon)) return false;
  if (checkIsCannotBuyXGetY(coupon, checkedCartItems)) return false;
  if (checkIsCannotFreeShipping(coupon, deliveryPrice)) return false;
  return true;
};

export default checkIsAvailableCoupon;

const checkIsNotOverMin = (coupon: Coupon, checkedCartItems: CartItem[]) => {
  const orderPrice = getOrderPrice(checkedCartItems);
  return orderPrice < (coupon.minimumAmount ?? 0);
};

const checkIsStaleCouponNow = (coupon: Coupon) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();

  if (coupon.expirationDate) {
    const [couponYear, couponMonth, couponDay] = coupon.expirationDate.split('-').map(Number);
    if (couponYear < year) return true;
    if (couponYear == year && couponMonth < month) return true;
    if (couponYear == year && couponMonth == month && couponDay < day) return true;
  }

  if (coupon.availableTime) {
    const [couponStartHour, couponStartMinute, couponStartSecond] = coupon.availableTime.start
      .split(':')
      .map(Number);
    const [couponEndHour, couponEndMinute, couponEndSecond] = coupon.availableTime.end
      .split(':')
      .map(Number);

    const todaySeconds = getSeconds(hour, minute, second);
    const startSeconds = getSeconds(couponStartHour, couponStartMinute, couponStartSecond);
    const endSeconds = getSeconds(couponEndHour, couponEndMinute, couponEndSecond);

    if (todaySeconds < startSeconds) return true;
    if (todaySeconds > endSeconds) return true;
  }
  return false;
};

const getSeconds = (hour: number, minute: number, second: number) => {
  return hour * 60 * 60 + minute * 60 + second;
};

const checkIsCannotBuyXGetY = (coupon: Coupon, checkedCartItems: CartItem[]) => {
  if (coupon.discountType !== 'buyXgetY') return false;
  if (!coupon.getQuantity || !coupon.buyQuantity) return false;
  const minimumAmount = coupon.getQuantity + coupon.buyQuantity;
  if (checkedCartItems.every((item) => item.quantity < minimumAmount)) return true;

  return false;
};

const checkIsCannotFreeShipping = (coupon: Coupon, deliveryPrice: number) => {
  if (coupon.discountType !== 'freeShipping') return false;
  if (deliveryPrice <= 0) return true;
  return false;
};
