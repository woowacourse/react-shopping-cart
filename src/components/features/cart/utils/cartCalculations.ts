import { CartItemType } from '..';
import { Coupon } from '../../coupon';

export const calculateOrderPrice = (cartItems: CartItemType[]) =>
  cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

export const calculateTotalProductQuantity = (cartItems: CartItemType[]) =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0);

export const calculateDiscountAmount = (
  coupons: Coupon[] | null,
  isCouponApplied: (id: number) => boolean
) => {
  if (!coupons) return 0;

  return coupons
    .filter((coupon) => isCouponApplied(coupon.data.id))
    .reduce((acc, item) => acc + item.discountAmount, 0);
};
