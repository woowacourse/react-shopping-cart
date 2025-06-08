import { CartItem } from '../../cart/api/types/cart';
import { Coupon } from '../types/coupon';

interface CouponDiscountPriceProps {
  totalPrice: number;
  cartItem: CartItem;
  coupon: Coupon;
  deliveryFee: number;
}

export const getCouponDiscountPrice = ({ coupon, cartItem, totalPrice, deliveryFee }: CouponDiscountPriceProps) => {
  switch (coupon.discountType) {
    case 'fixed': {
      return 5000;
    }
    case 'buyXgetY': {
      if (cartItem.quantity <= 2) return 0;
      return cartItem.product.price;
    }
    case 'freeShipping': {
      return deliveryFee;
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
