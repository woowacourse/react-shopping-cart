import { CartItem } from '../../cart/api/types/cart';
import { Coupon } from '../types/coupon';

interface CouponDiscountPriceProps {
  totalPrice: number;
  cartItem: CartItem;
  coupon: Coupon;
  deliveryFee: number;
  updateMessage?: React.Dispatch<React.SetStateAction<string>>;
}

export const getCouponDiscountPrice = ({
  coupon,
  cartItem,
  totalPrice,
  deliveryFee,
  updateMessage,
}: CouponDiscountPriceProps) => {
  switch (coupon.discountType) {
    case 'fixed': {
      return 5000;
    }
    case 'buyXgetY': {
      if (!coupon.buyQuantity || !coupon.getQuantity) return 0;
      if (cartItem.quantity <= coupon.buyQuantity) {
        updateMessage &&
          updateMessage(
            `${coupon.getQuantity + coupon.buyQuantity - cartItem.quantity}개 더 구매 시 ${
              coupon.getQuantity
            }개 무료 증정!`
          );
        return 0;
      }
      console.log('getQuantity', cartItem.product.price, coupon.getQuantity);
      return cartItem.product.price * coupon.getQuantity;
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
