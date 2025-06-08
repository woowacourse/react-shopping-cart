import { CartItem, Coupon } from '../types';
import checkIsAvailableCoupon from './checkIsAvailableCoupon';

const getAvailableCoupons = (coupons: Coupon[], checkedCartItems: CartItem[]) => {
  return coupons.filter((coupon) => checkIsAvailableCoupon(coupon, checkedCartItems));
};

export default getAvailableCoupons;
