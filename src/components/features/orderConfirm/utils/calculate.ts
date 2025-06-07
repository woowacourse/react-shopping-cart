import { CartItemType } from '../../cart/types';
import { Coupon } from '../types';

export function calculateCouponDiscount(
  coupon: Coupon,
  products: CartItemType[]
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
      return Math.floor((cartTotal * (coupon.discount ?? 0)) / 100);
    }
    case 'buyXgetY': {
      const eligibleItems = products.filter(
        (item) => item.quantity >= (coupon.buyQuantity ?? 0)
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
      return cartTotal >= (coupon.minimumAmount ?? 0) ? 3000 : 0;
    }
    default: {
      return 0;
    }
  }
}
