import { Coupon } from '../../../types/coupon';
import { CartItemType } from '../../../types/cartItem';
import { isCouponEnabled } from './isCouponEnabled';
import { calculateCouponDiscount } from './calculateCouponDiscount';
import { MAX_COUPON_LENGTH } from '../../../constants/maxCouponLength';

export function getBestCoupons(
  coupons: Coupon[],
  orderAmount: number,
  items: CartItemType[],
  now: Date = new Date()
): Coupon[] {
  const enabled = coupons.filter((coupon) => isCouponEnabled({ coupon, orderAmount, items, now }));

  const withValue = enabled.map((coupon) => ({
    coupon,
    value: calculateCouponDiscount(coupon, orderAmount, items)
  }));

  withValue.sort((a, b) => b.value - a.value);

  return withValue.slice(0, MAX_COUPON_LENGTH).map(({ coupon }) => coupon);
}
