import { CouponResponse } from '../types/Coupon.types';
import { CartItem } from '../../../features/Cart/types/Cart.types';

export const isCouponValid = (
  coupon: CouponResponse,
  selectedCartItems: CartItem[],
  orderPrice: number
): boolean => {
  const now = new Date();

  switch (coupon.discountType) {
    case 'fixed':
    case 'freeShipping':
      if (coupon.minimumAmount && orderPrice < coupon.minimumAmount) {
        return false;
      }
      if (coupon.expirationDate && new Date(coupon.expirationDate) < now) {
        return false;
      }
      return true;

    case 'percentage':
      if (coupon.expirationDate && new Date(coupon.expirationDate) < now) {
        return false;
      }
      if (coupon.availableTime) {
        const currentHour = now.getHours();
        const startHour = parseInt(coupon.availableTime.start.split(':')[0], 10);
        const endHour = parseInt(coupon.availableTime.end.split(':')[0], 10);
        if (currentHour < startHour || currentHour >= endHour) {
          return false;
        }
      }
      return true;

    case 'buyXgetY':
      const bogoEligible = selectedCartItems.some(
        (item) => item.quantity >= (coupon.buyQuantity ?? 2)
      );
      return bogoEligible;

    default:
      return false;
  }
};
