import { TCartItem } from '../types/CartItem.type';
import { Coupon } from '../types/Coupon.type';

const calculateFixedDiscount = (coupon: Coupon) => {
  return coupon.discount ?? 0;
};

const calculatePercentageDiscount = (coupon: Coupon, totalPrice: number) => {
  return Math.floor((totalPrice * (coupon.discount ?? 0)) / 100);
};

const calculateBogoDiscount = (cartItem: TCartItem[]) => {
  const priceList = cartItem.filter((item) => item.quantity >= 2).map((item) => item.product.price);
  return Math.max(...priceList);
};

export const calculateDiscountPrice = (
  coupon: Coupon,
  cartItem: TCartItem[],
  deliveryFee: number,
  totalPrice: number,
) => {
  switch (coupon.discountType) {
    case 'fixed':
      return calculateFixedDiscount(coupon);
    case 'percentage':
      return calculatePercentageDiscount(coupon, totalPrice);
    case 'buyXgetY':
      return calculateBogoDiscount(cartItem);
    case 'freeShipping':
      return deliveryFee;
    default:
      return 0;
  }
};
