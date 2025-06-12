import { CartItem } from '../../cart/api/types/cart';
import { Coupon } from '../types/coupon';

interface CouponDiscountPriceProps {
  totalPrice: number;
  cartItem: CartItem;
  coupon: Coupon;
  deliveryFee: number;
}

interface CouponDiscountPrice {
  price: number;
  type: string;
  message: string;
}

export const getCouponDiscountPrice = ({
  coupon,
  cartItem,
  totalPrice,
  deliveryFee,
}: CouponDiscountPriceProps): CouponDiscountPrice => {
  switch (coupon.discountType) {
    case 'fixed': {
      return { price: 5000, type: coupon.discountType, message: '' };
    }
    case 'buyXgetY': {
      if (!coupon.buyQuantity || !coupon.getQuantity) return { price: 0, type: coupon.discountType, message: '' };
      if (cartItem.quantity <= coupon.buyQuantity) {
        return {
          price: 0,
          type: coupon.discountType,
          message: `${coupon.getQuantity + coupon.buyQuantity - cartItem.quantity}개 더 구매 시 ${
            coupon.getQuantity
          }개 무료 증정!`,
        };
      }
      return { price: cartItem.product.price * coupon.getQuantity, type: coupon.discountType, message: '' };
    }
    case 'freeShipping': {
      return { price: deliveryFee, type: coupon.discountType, message: '' };
    }
    case 'percentage': {
      if (!coupon.discount) return { price: 0, type: coupon.discountType, message: '' };
      return { price: totalPrice * coupon.discount * 0.01, type: coupon.discountType, message: '' };
    }
    default: {
      return { price: 0, type: coupon.discountType, message: '알 수 없는 쿠폰 유형입니다.' };
    }
  }
};
