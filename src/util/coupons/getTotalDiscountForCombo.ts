import { CartItem } from "../../type/CartItem";
import { Coupon } from "../../type/Coupons";
import { getDiscountAmount } from "./getDiscountAmount";

export const getTotalDiscountForCombo = ({
  coupons,
  cartItems,
  hasDefaultShipping,
  hasRemoteAreaShipping,
  initialTotalPrice,
}: {
  coupons: Coupon[];
  cartItems: CartItem[];
  hasDefaultShipping: boolean;
  hasRemoteAreaShipping: boolean;
  initialTotalPrice: number;
}) => {
  return coupons.reduce(
    ({ totalPrice, totalDiscount }, coupon) => {
      const discount = getDiscountAmount({
        coupon,
        totalPrice,
        cartItems,
        hasDefaultShipping,
        hasRemoteAreaShipping,
      });
      return {
        totalPrice: totalPrice - discount,
        totalDiscount: totalDiscount + discount,
      };
    },
    {
      totalPrice: initialTotalPrice,
      totalDiscount: 0,
    }
  ).totalDiscount;
};
