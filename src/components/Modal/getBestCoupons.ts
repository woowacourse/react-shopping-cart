import { Coupon } from '../../types/coupon';
import { CartItemType } from '../../types/cartItem';
import { isCouponDisabled } from './isCouponDisabled';
import { calculateCouponDiscount } from './calculateCouponDiscount';

export function getBestCoupons(
  coupons: Coupon[],
  orderAmount: number,
  items: CartItemType[],
  deliveryFee: number,
  now: Date = new Date()
): { appliedCoupons: Coupon[]; totalDiscount: number } {
  const enabled = coupons.filter((c) => !isCouponDisabled(c, orderAmount, items, now));

  const withValue = enabled.map((c) => ({
    coupon: c,
    value: calculateCouponDiscount(c, orderAmount, items, deliveryFee)
  }));

  withValue.sort((a, b) => b.value - a.value);

  const selected = withValue.slice(0, 2).map((x) => x.coupon);

  const totalDiscount = withValue.slice(0, 2).reduce((sum, x) => sum + x.value, 0);

  return { appliedCoupons: selected, totalDiscount };
}
