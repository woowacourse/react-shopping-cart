import { Coupon } from '../../../types/coupon';
import { CartItemType } from '../../../types/cartItem';
import { isCouponDisabled } from './isCouponDisabled';
import { calculateCouponDiscount } from './calculateCouponDiscount';
import { MAX_COUPON_LENGTH } from '../../../constants/maxCouponLength';

export function getBestCoupons(
  coupons: Coupon[],
  orderAmount: number,
  items: CartItemType[],
  deliveryFee: number,
  now: Date = new Date()
): Coupon[] {
  const enabled = coupons.filter((c) => !isCouponDisabled(c, orderAmount, items, now));

  const withValue = enabled.map((c) => ({
    coupon: c,
    value: calculateCouponDiscount(c, orderAmount, items, deliveryFee)
  }));

  withValue.sort((a, b) => b.value - a.value);

  return withValue.slice(0, MAX_COUPON_LENGTH).map((x) => x.coupon);
}
