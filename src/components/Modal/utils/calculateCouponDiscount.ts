import { Coupon } from '../../../types/coupon';
import { CartItemType } from '../../../types/cartItem';

interface CalculateCouponDiscountProps {
  coupon: Coupon;
  orderAmount: number;
  items: CartItemType[];
}

export function calculateCouponDiscount({ coupon, orderAmount, items }: CalculateCouponDiscountProps): number {
  switch (coupon.discountType) {
    case 'fixed':
      return coupon.discount;

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
