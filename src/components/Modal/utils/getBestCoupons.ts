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
  const enabledCoupons = coupons.filter((coupon) => isCouponEnabled({ coupon, orderAmount, items, now }));

  const enabledCouponsWithValue = enabledCoupons
    .map((coupon) => ({
      coupon,
      value: calculateCouponDiscount(coupon, orderAmount, items)
    }))
    .sort((a, b) => b.value - a.value);

  return enabledCouponsWithValue.slice(0, MAX_COUPON_LENGTH).map(({ coupon }) => coupon);
}
