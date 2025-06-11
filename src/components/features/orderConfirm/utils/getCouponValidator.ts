import { CartItemType } from '../../cart/types';
import { CouponType } from '../types';
import { couponUsableCalculators } from './couponUsableCalculators';

export function getCouponValidator(
  coupon: CouponType,
  cartItems: CartItemType[],
  orderPrice: number
) {
  const now = new Date();
  if (now > new Date(coupon.expirationDate)) return false;

  const validate = couponUsableCalculators[coupon.discountType];
  if (!validate) return false;
  return validate(coupon, cartItems, orderPrice);
}
