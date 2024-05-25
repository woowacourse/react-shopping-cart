import { Coupon } from '@appTypes/orderConfirm';
import { CartItem } from '@appTypes/shoppingCart';

export interface CouponValidation {
  coupon: Coupon;
  totalPrice: number;
  shippingPrice: number;
  selectedCartItems: CartItem[];
}
