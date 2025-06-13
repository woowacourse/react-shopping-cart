import { CartItem } from '../../cart/types/cart';
import { Coupon } from '../../coupon/types/coupon';

export interface OrderCalculation {
  cartTypeQuantity: number;
  totalQuantity: number;
  totalPrice: number;
  deliveryFee: number;
  totalPurchasePrice: number;
  couponDiscountPrice: number;
  appliedCoupons: Coupon[];
}

export interface OrderOptions {
  isRemoteArea: boolean;
}

export interface CalculateOrderParams {
  selectedCartItems: CartItem[];
  selectedCoupons?: Coupon[];
  isRemoteArea?: boolean;
  currentTime?: Date;
}
