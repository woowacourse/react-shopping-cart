import { CartItem, Coupon } from '../types';
import checkIsAvailableCoupon from './checkIsAvailableCoupon';

const getAvailableCoupons = (
  coupons: Coupon[],
  checkedCartItems: CartItem[],
  deliveryPrice: number
) => {
  return coupons.filter((coupon) =>
    checkIsAvailableCoupon(coupon, checkedCartItems, deliveryPrice)
  );
};

export default getAvailableCoupons;
