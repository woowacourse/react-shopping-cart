import { CartItem } from '../../../cart/types/cart';
import { Coupon } from '../../types/coupon';

export const calculateFixedDiscount = (coupon: Coupon, orderPrice: number): number => {
  if (coupon.discountType !== 'fixed' || !coupon.discount) return 0;
  if (coupon.minimumAmount && orderPrice < coupon.minimumAmount) return 0;
  return coupon.discount;
};

export const calculateBuyXGetYDiscount = (coupon: Coupon, items: CartItem[]): number => {
  if (coupon.discountType !== 'buyXgetY') return 0;

  const buyQuantity = coupon.buyQuantity || 2;
  const getQuantity = coupon.getQuantity || 1;
  const setSize = buyQuantity + getQuantity;

  const eligibleItems = items
    .filter((item) => item.quantity >= setSize)
    .sort((a, b) => b.product.price - a.product.price);

  if (eligibleItems.length === 0) return 0;

  const highestPriceItem = eligibleItems[0];
  const freeItemCount = Math.floor(highestPriceItem.quantity / setSize) * getQuantity;

  return highestPriceItem.product.price * freeItemCount;
};

export const calculateShippingDiscount = (coupon: Coupon, orderPrice: number, shippingFee: number): number => {
  if (coupon.discountType !== 'freeShipping') return 0;
  if (coupon.minimumAmount && orderPrice < coupon.minimumAmount) return 0;
  return shippingFee;
};

export const calculatePercentageDiscount = (coupon: Coupon, orderPrice: number, currentTime?: Date): number => {
  if (coupon.discountType !== 'percentage' || !coupon.discount) return 0;

  if (coupon.availableTime && currentTime) {
    const now = currentTime;
    const startHour = parseInt(coupon.availableTime.start.split(':')[0]);
    const endHour = parseInt(coupon.availableTime.end.split(':')[0]);
    const currentHour = now.getHours();

    if (currentHour < startHour || currentHour >= endHour) return 0;
  }

  return Math.floor(orderPrice * (coupon.discount / 100));
};
