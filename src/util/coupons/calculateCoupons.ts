import { CartItem } from "../../type/CartItem";
import { Coupon } from "../../type/Coupons";
import { calculateShippingFee } from "../cart/calculateShippingFee";
import { calculateTotalPrice } from "../cart/calculateTotalPrice";
import { getCouponCombos } from "./getCouponCombos";
import { getTotalDiscountForCombo } from "./getTotalDiscountForCombo";

export const calculateCoupons = ({
  cartItems,
  coupons,
  hasRemoteAreaShipping,
}: {
  cartItems: CartItem[];
  coupons: Coupon[];
  hasRemoteAreaShipping: boolean;
}) => {
  const couponCombos = getCouponCombos(coupons);
  const initialTotalPrice = calculateTotalPrice(cartItems);
  const hasDefaultShipping = calculateShippingFee(initialTotalPrice) !== 0;

  const maxDiscountedPrice = Math.max(
    ...couponCombos.map((coupons) =>
      getTotalDiscountForCombo({
        coupons,
        cartItems,
        hasDefaultShipping,
        hasRemoteAreaShipping,
        initialTotalPrice,
      })
    )
  );

  return { maxDiscountedPrice };
};
