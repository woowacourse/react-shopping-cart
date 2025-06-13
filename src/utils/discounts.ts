import { Coupon } from "../apis/coupons";
import { CartItem } from "../types/type";
import {
  FREE_SHIPPING_MIN_AMOUNT,
  REMOTE_AREA_SHIPPING_FEE,
  SHIPPING_FEE,
} from "../constants";

export const calculateBuyXGetYDiscount = (
  selectedItems: CartItem[],
  coupon: Coupon
): number => {
  if (!coupon.buyQuantity || !coupon.getQuantity) {
    return 0;
  }

  const requiredQuantity = coupon.buyQuantity + coupon.getQuantity;

  const eligibleItems = selectedItems.filter(
    (item) => item.quantity >= requiredQuantity
  );

  if (eligibleItems.length === 0) {
    return 0;
  }

  let maxPrice = 0;
  eligibleItems.forEach((item) => {
    if (item.product.price > maxPrice) {
      maxPrice = item.product.price;
    }
  });

  return maxPrice;
};

export const calculateFreeShippingDiscount = (
  orderPrice: number,
  isRemoteAreaShipping: boolean
): number => {
  if (orderPrice >= FREE_SHIPPING_MIN_AMOUNT) {
    return isRemoteAreaShipping ? REMOTE_AREA_SHIPPING_FEE : 0;
  }
  return SHIPPING_FEE + (isRemoteAreaShipping ? REMOTE_AREA_SHIPPING_FEE : 0);
};
