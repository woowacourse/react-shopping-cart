import { BuyXGetYCoupon, CartItem } from "../../types/type";
import { isValidExpiration } from "./isValidExpiration";

export const calculateBuyXgetYDiscount = (
  coupon: BuyXGetYCoupon,
  selectedItems: CartItem[]
) => {
  if (!isValidExpiration(coupon.expirationDate)) return 0;
  let totalDiscount = 0;

  for (const cartItem of selectedItems) {
    const canGetY =
      cartItem.quantity >= coupon.buyQuantity + coupon.getQuantity;
    const tmpDiscount = canGetY
      ? cartItem.product.price * coupon.getQuantity
      : 0;

    totalDiscount = totalDiscount < tmpDiscount ? tmpDiscount : totalDiscount;
  }
  return totalDiscount;
};
