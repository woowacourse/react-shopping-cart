import { CartItem } from '../../../features/Cart/types/Cart.types';
import { Coupon } from '../types/Coupon.types';
import { FREE_DELIVERY_THRESHOLD } from '../../../features/Cart/constants/price';

export const calculateTotalDiscount = (
  selectedCartItems: CartItem[],
  coupons: Coupon[],
  {
    isRemoteArea,
    totalPrice,
  }: {
    isRemoteArea: boolean;
    totalPrice: number;
  }
): number => {
  return coupons.reduce((acc, c) => {
    switch (c.discountType) {
      case 'fixed':
        return acc + (c.discount ?? 0);
      case 'percentage':
        return acc + Math.floor(totalPrice * ((c.discount ?? 0) / 100));
      case 'buyXgetY': {
        const bogoTargetItems = selectedCartItems.filter((item) => item.quantity >= 2);
        if (bogoTargetItems.length === 0) return acc;
        const mostExpensive = bogoTargetItems.reduce((prev, current) =>
          current.product.price > prev.product.price ? current : prev
        );
        return acc + mostExpensive.product.price;
      }
      case 'freeShipping':
        if (totalPrice < FREE_DELIVERY_THRESHOLD) {
          return acc + (isRemoteArea ? 6000 : 3000);
        }
        return acc;
      default:
        return acc;
    }
  }, 0);
};
