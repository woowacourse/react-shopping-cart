import { Coupon } from '../../../types/coupon';
import { CartItemType } from '../../../types/cartItem';
import { isCouponEnabled } from './isCouponEnabled';
import { calculateCouponDiscount } from './calculateCouponDiscount';
import { MAX_COUPON_LENGTH } from '../../../constants/maxCouponLength';

interface GetBestCouponsProps {
  coupons: Coupon[];
  orderAmount: number;
  items: CartItemType[];
  now?: Date;
}

export function getBestCoupons({ coupons, orderAmount, items, now }: GetBestCouponsProps): Coupon[] {
  return coupons
    .filter((coupon) => isCouponEnabled({ coupon, orderAmount, items, now }))
    .map((coupon) => ({
      coupon,
      value: calculateCouponDiscount({ coupon, orderAmount, items })
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, MAX_COUPON_LENGTH)
    .map(({ coupon }) => coupon);
}
