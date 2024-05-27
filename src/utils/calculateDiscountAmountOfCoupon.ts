import { CartItem } from "../types/cartItems";
import {
  Coupon,
  isBOGOCoupon,
  isFixedDiscountCoupon,
  isFreeShippingCoupon,
  isPercentageDiscountCoupon,
} from "../types/coupons";
import { checkApplicableCoupon } from "./checkApplicableCoupon";

export const calculateDiscountAmountOfCoupon = (
  coupon: Coupon,
  {
    orderAmount,
    cartItems,
    deliveryCost,
  }: { orderAmount: number; cartItems: CartItem[]; deliveryCost: number }
) => {
  if (!checkApplicableCoupon(coupon, { orderAmount, cartItems })) {
    return 0;
  }
  if (isFixedDiscountCoupon(coupon)) {
    return coupon.discount;
  }
  if (isPercentageDiscountCoupon(coupon)) {
    return (orderAmount * coupon.discount) / 100;
  }
  if (isFreeShippingCoupon(coupon)) {
    return deliveryCost;
  }
  if (isBOGOCoupon(coupon)) {
    const filteredCatItems = cartItems.filter(
      (cartItem) =>
        cartItem.isSelected &&
        cartItem.quantity >= coupon.buyQuantity + coupon.getQuantity
    );
    return filteredCatItems.reduce(
      (max, cartItem) =>
        Math.max(max, cartItem.product.price * coupon.getQuantity),
      0
    );
  }
  return 0;
};
