import { CartItem, Coupon } from '../types';
import getOrderPrice from './getOrderPrice';

const checkIsAvailableCoupon = (coupon: Coupon, cartItems: CartItem[]) => {
  const orderPrice = getOrderPrice(cartItems);
  if (orderPrice < (coupon.minimumAmount ?? 0)) return false;
  if (checkIsStaleCouponNow(coupon)) return false;

  return true;
};

export default checkIsAvailableCoupon;

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
