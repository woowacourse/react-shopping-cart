import { CartItemTypes } from '../types/cartItem';
import { Coupon } from '../types/coupon';
import { calculateCouponPrice } from './calculateCouponPrice';

export const isCouponDisabled = (
  coupon: Coupon,
  cartItems: CartItemTypes[],
  deliveryFee: number
) =>
  calculateCouponPrice({
    couponIds: [coupon.id.toString()],
    coupons: [coupon],
    selectedCartItems: cartItems,
    deliveryFee,
    nowDate: new Date(),
  }) === 0;
