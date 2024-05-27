import { CartItemProps, CouponProps } from '../../types';

export const isCouponAvailableQuantity = (
  coupon: CouponProps,
  orderItems: CartItemProps[],
) => {
  if (Array.isArray(orderItems) && coupon.buyQuantity) {
    const couponAvailableCondition = coupon.buyQuantity;

    return orderItems.some(
      (item) => item.quantity === couponAvailableCondition,
    );
  }
  return false;
};
