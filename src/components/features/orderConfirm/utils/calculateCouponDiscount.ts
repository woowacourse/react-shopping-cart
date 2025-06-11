import { CartItemType } from '../../cart/types';
import { CouponType } from '../types';
import { couponCalculators } from './couponCalculators';

export function calculateCouponDiscount(
  coupon: CouponType,
  products: CartItemType[],
  isIslandAreaSelected: boolean
): number {
  const calculator = couponCalculators[coupon.discountType];
  if (!calculator) return 0;
  return calculator(coupon, products, isIslandAreaSelected);
}
