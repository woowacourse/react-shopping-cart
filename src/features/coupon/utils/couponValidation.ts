import { CartItem } from '../../cart/types/cart';
import { Coupon } from '../types/coupon';

export const isCouponApplicable = (
  coupon: Coupon,
  orderItems: CartItem[],
  orderPrice: number,
  currentTime: Date = new Date()
): boolean => {
  switch (coupon.discountType) {
    case 'fixed':
      return !coupon.minimumAmount || orderPrice >= coupon.minimumAmount;

    case 'percentage':
      if (coupon.availableTime) {
        const startHour = parseInt(coupon.availableTime.start.split(':')[0]);
        const endHour = parseInt(coupon.availableTime.end.split(':')[0]);
        const currentHour = currentTime.getHours();

        if (currentHour < startHour || currentHour >= endHour) return false;
      }
      return true;

    case 'buyXgetY':
      const buyQuantity = coupon.buyQuantity || 2;
      const getQuantity = coupon.getQuantity || 1;
      const setSize = buyQuantity + getQuantity;

      return orderItems.some((item) => item.quantity >= setSize);

    case 'freeShipping':
      return !coupon.minimumAmount || orderPrice >= coupon.minimumAmount;

    default:
      return false;
  }
};
