import { CartItem } from "../../../type/CartItem";
import { BuyXGetYCoupon } from "../../../type/Coupons";

export const validateBuyXGetYCoupon = ({
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

  return availableCartItems.length > 0;
};
