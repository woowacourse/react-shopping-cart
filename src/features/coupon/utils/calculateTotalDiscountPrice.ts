import { CartItem } from '../../cart/api/types/cart';
import { Coupon } from '../types/coupon';
import { getCouponDiscountPrice } from './getCouponDiscountPrice';

interface CalculateTotalDiscountPriceProps {
  selectedCoupons: Coupon[];
  highestPriceCartItem: CartItem;
  totalPrice: number;
}

export const calculateTotalDiscountPrice = ({
  selectedCoupons,
  highestPriceCartItem,
  totalPrice,
}: CalculateTotalDiscountPriceProps) => {
  return selectedCoupons.reduce(
    (acc, coupon) =>
      acc +
      getCouponDiscountPrice({
        coupon,
        cartItem: highestPriceCartItem,
        totalPrice,
      }),
    0
  );
};
