import { CartItem } from "../../../type/CartItem";
import { BuyXGetYCoupon } from "../../../type/Coupons";
import { validateExpirationDate } from "../validateCoupons";

export const validateBuyXGetYCoupon = ({
  coupon,
  cartItems,
}: {
  coupon: BuyXGetYCoupon;
  cartItems: CartItem[];
}) => {
  const { buyQuantity, getQuantity, expirationDate } = coupon;
  const availableCartItems = cartItems.filter(
    (item) => item.quantity >= buyQuantity + getQuantity
  );

  return (
    availableCartItems.length > 0 && validateExpirationDate(expirationDate)
  );
};
