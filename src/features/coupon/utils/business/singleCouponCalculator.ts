import { CartItem } from '../../../cart/types/cart';
import { Coupon } from '../../types/coupon';
import {
  calculateFixedDiscount,
  calculateBuyXGetYDiscount,
  calculateShippingDiscount,
  calculatePercentageDiscount,
} from './couponDiscountCalculators';

export const calculateCouponDiscount = (
  coupon: Coupon,
  orderItems: CartItem[],
  orderPrice: number,
  shippingFee: number,
  currentTime?: Date
): number => {
  switch (coupon.discountType) {
    case 'fixed':
      return calculateFixedDiscount(coupon, orderPrice);
    case 'percentage':
      return calculatePercentageDiscount(coupon, orderPrice, currentTime);
    case 'buyXgetY':
      return calculateBuyXGetYDiscount(coupon, orderItems);
    case 'freeShipping':
      return calculateShippingDiscount(coupon, orderPrice, shippingFee);
    default:
      return 0;
  }
};
