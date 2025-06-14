import { CartItemCheckType } from "../../hooks/useCartAPI";
import { Coupon } from "../../types/response";

const getBuyXGetYDiscount = (
  coupon: Coupon,
  cartItems: CartItemCheckType[]
) => {
  const { buyQuantity, getQuantity } = coupon;

  if (typeof buyQuantity !== "number" || typeof getQuantity !== "number") {
    return 0;
  }

  const eligibleItems = cartItems.filter(
    (item) => item.quantity === buyQuantity + getQuantity
  );

  if (eligibleItems.length === 0) return 0;

  const mostExpensiveItem = eligibleItems.reduce((prev, curr) =>
    curr.price > prev.price ? curr : prev
  );

  const discount = getQuantity * mostExpensiveItem.price;

  return discount;
};

export default getBuyXGetYDiscount;
