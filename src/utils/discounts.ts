import { Coupon } from "../apis/coupons";
import { CartItem } from "../types/type";

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
