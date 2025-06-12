import { CartItemTypes } from '../types/cartItem';
import { Coupon } from '../types/coupon';
import { calculateCouponPrice } from '../domain';

export const isCouponDisabled = (
  coupon: Coupon,
  cartItems: CartItemTypes[],
  deliveryFee: number
) =>
  calculateCouponPrice({
    selectedCoupons: [coupon],
    selectedCartItems: cartItems,
    deliveryFee,
    nowDate: new Date(),
  }) === 0;
