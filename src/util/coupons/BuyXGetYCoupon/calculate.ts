import { CartItem } from "../../../type/CartItem";
import { BuyXGetYCoupon } from "../../../type/Coupons";

export const calculateBuyXGetYCoupon = ({
  totalPrice,
  coupon,
  cartItems,
}: {
  totalPrice: number;
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

  const discountedPrice = totalPrice - mostExpensiveItemPrice * getQuantity;

  return discountedPrice < 0 ? 0 : discountedPrice;
};
