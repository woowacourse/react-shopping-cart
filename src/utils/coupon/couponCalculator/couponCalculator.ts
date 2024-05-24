import { TCartItem } from '../../../types/CartItem.type';
import { Coupon } from '../../../types/Coupon.type';

export const calculateFixedDiscount = (coupon: Coupon) => {
  return coupon.discount ?? 0;
};

export const calculatePercentageDiscount = (coupon: Coupon, totalPrice: number) => {
  return Math.floor((totalPrice * (coupon.discount ?? 0)) / 100);
};

export const calculateBogoDiscount = (cartItem: TCartItem[]) => {
  const priceList = cartItem.filter((item) => item.quantity >= 2).map((item) => item.product.price);
  return priceList.length > 0 ? Math.max(...priceList) : 0;
};

export const calculateDiscountPrice = (
  coupon: Coupon,
  cartItem: TCartItem[],
  totalPrice: number,
  deliveryFee: number,
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
