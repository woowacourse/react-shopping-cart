import { CartItem } from '../../cart/api/types/cart';
import { Coupon } from '../types/coupon';

interface CouponDiscountPriceProps {
  totalPrice: number;
  cartItem: CartItem;
  coupon: Coupon;
}

export const getCouponDiscountPrice = ({ coupon, cartItem, totalPrice }: CouponDiscountPriceProps) => {
  switch (coupon.discountType) {
    case 'fixed': {
      return 5000;
    }
    case 'buyXgetY': {
      if (cartItem.quantity <= 2) return 0;
      return cartItem.product.price;
    }
    case 'freeShipping': {
      return 3000;
    }
    case 'percentage': {
      if (!coupon.discount) return 0;
      return totalPrice * coupon.discount * 0.01;
    }
    default: {
      return 0;
    }
  }
};
