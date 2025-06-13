import { CartItem } from "../../type/CartItem";
import { Coupon } from "../../type/Coupons";
import { calculateShippingFee } from "../cart/calculateShippingFee";
import { calculateTotalPrice } from "../cart/calculateTotalPrice";
import { getCouponCombos } from "./getCouponCombos";
import { getDiscountAmount } from "./getDiscountAmount";

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

  const getTotalDiscountForCombo = (combo: Coupon[]) => {
    return combo.reduce(
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

  const maxDiscountedPrice = Math.max(
    ...couponCombos.map(getTotalDiscountForCombo)
  );

  return { maxDiscountedPrice };
};
