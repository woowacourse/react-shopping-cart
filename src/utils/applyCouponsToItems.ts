import { CartItem, Coupon } from '../types';
import getDiscountPrice from './getDiscountPrice';
import getOrderPrice from './getOrderPrice';

const applyCouponsToItems = (cartItems: CartItem[], deliveryPrice: number, coupons: Coupon[]) => {
  const orderPrice = getOrderPrice(cartItems);
  const discountedPrice = coupons.reduce((acc, coupon) => {
    return acc - getDiscountPrice(coupon, cartItems, deliveryPrice, acc);
  }, orderPrice);
  return orderPrice - discountedPrice;
};

export default applyCouponsToItems;
