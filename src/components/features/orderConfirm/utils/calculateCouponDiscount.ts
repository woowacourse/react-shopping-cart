import { DELIVERY_FEE } from '../../../../global/constants';
import { CartItemType } from '../../cart/types';
import { Coupon } from '../types';
import { isWithinTimeRange } from './isWithInTimeRange';

export function calculateCouponDiscount(
  coupon: Coupon,
  products: CartItemType[],
  isIslandAreaSelected: boolean
): number {
  const cartTotal = products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  switch (coupon.discountType) {
    case 'fixed': {
      return cartTotal >= (coupon.minimumAmount ?? 0) ? coupon.discount : 0;
    }
    case 'percentage': {
      if (coupon.availableTime) {
        const { start, end } = coupon.availableTime;
        if (!isWithinTimeRange(start, end)) return 0;
      }
      return Math.floor((cartTotal * (coupon.discount ?? 0)) / 100);
    }
    case 'buyXgetY': {
      const requiredQuantity =
        (coupon.buyQuantity ?? 0) + (coupon.getQuantity ?? 0);

      const eligibleItems = products.filter(
        (item) => item.quantity >= requiredQuantity
      );

      if (eligibleItems.length > 0) {
        const maxPrice = Math.max(
          ...eligibleItems.map((item) => item.product.price)
        );
        return maxPrice;
      }
      return 0;
    }
    case 'freeShipping': {
      if (cartTotal >= (coupon.minimumAmount ?? 0)) {
        return isIslandAreaSelected
          ? DELIVERY_FEE.EXTRA
          : DELIVERY_FEE.STANDARD;
      }
      return 0;
    }
    default: {
      return 0;
    }
  }
}
