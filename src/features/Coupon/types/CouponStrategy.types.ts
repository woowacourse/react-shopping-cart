import { CartItem } from '@/features/Cart/types/Cart.types';
import { Coupon } from './Coupon.types';

export type CouponStrategy = {
  validate: (
    coupon: Coupon,
    selectedCartItems: CartItem[],
    context: { totalPrice: number }
  ) => boolean;
  calculate: (
    coupon: Coupon,
    selectedCartItems: CartItem[],
    context: { isRemoteArea: boolean; totalPrice: number }
  ) => number;
};
