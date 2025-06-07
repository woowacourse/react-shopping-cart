import { CartItemWithSelection } from "../../cart/types/response";
import { Coupon } from "../types/response";

export const calculateBuyXGetYDiscount = (
  coupon: Coupon,
  items: CartItemWithSelection[]
): number => {
  if (coupon.discountType !== "buyXgetY") return 0;

  const buyQuantity = coupon.buyQuantity || 2;
  const getQuantity = coupon.getQuantity || 1;
  const setSize = buyQuantity + getQuantity;

  const eligibleItems = items
    .filter((item) => item.quantity >= setSize)
    .sort((a, b) => b.product.price - a.product.price);

  if (eligibleItems.length === 0) return 0;

  const highestPriceItem = eligibleItems[0];
  const freeItemCount = Math.floor(highestPriceItem.quantity / setSize);

  return highestPriceItem.product.price * freeItemCount;
};
