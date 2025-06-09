import { Coupon } from '../../types/coupon';
import { CartItemType } from '../../types/cartItem';
import { isCouponDisabled } from './isCouponDisabled';

/**
 * 개별 쿠폰이 얼마나 할인해 주는지 계산합니다.
 */
function calculateCouponDiscount(
  coupon: Coupon,
  orderAmount: number,
  items: CartItemType[],
  deliveryFee: number
): number {
  switch (coupon.discountType) {
    case 'fixed':
      return coupon.discount;

    case 'freeShipping':
      return deliveryFee;

    case 'percentage':
      return Math.floor(orderAmount * (coupon.discount / 100));

    case 'buyXgetY': {
      if (items.length === 0) return 0;
      const highest = items.reduce((prev, item) => (item.product.price > prev.product.price ? item : prev), items[0]);
      return highest.product.price * coupon.getQuantity;
    }

    default:
      return 0;
  }
}

/**
 * 사용 가능한(비활성화되지 않은) 쿠폰 중에서, 가장 할인폭이 큰
 * 최대 2개의 쿠폰을 골라 반환합니다.
 */
export function getBestCoupons(
  coupons: Coupon[],
  orderAmount: number,
  items: CartItemType[],
  deliveryFee: number,
  now: Date = new Date()
): { appliedCoupons: Coupon[]; totalDiscount: number } {
  // 1) 사용 가능 쿠폰만 필터
  const enabled = coupons.filter((c) => !isCouponDisabled(c, orderAmount, items, now));

  // 2) 각 쿠폰의 할인액 계산
  const withValue = enabled.map((c) => ({
    coupon: c,
    value: calculateCouponDiscount(c, orderAmount, items, deliveryFee)
  }));

  // 3) 할인액 내림차순 정렬
  withValue.sort((a, b) => b.value - a.value);

  // 4) 최대 2개 선택
  const selected = withValue.slice(0, 2).map((x) => x.coupon);

  // 5) 총 할인액 합산
  const totalDiscount = withValue.slice(0, 2).reduce((sum, x) => sum + x.value, 0);

  return { appliedCoupons: selected, totalDiscount };
}
