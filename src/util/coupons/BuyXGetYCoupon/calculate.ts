import { CartItem } from "../../../type/CartItem";
import { BuyXGetYCoupon } from "../../../type/Coupons";

export const calculateBuyXGetYCoupon = ({
  coupon,
  cartItems,
}: {
  coupon: BuyXGetYCoupon;
  cartItems: CartItem[];
}) => {
  const { buyQuantity, getQuantity } = coupon;
  const availableCartItems = cartItems.filter(
    (item) => item.quantity >= buyQuantity + getQuantity
  );
  const mostExpensiveItemPrice = Math.max(
    ...availableCartItems.map((cartItem) => cartItem.product.price)
  );

  return mostExpensiveItemPrice * getQuantity;
};
