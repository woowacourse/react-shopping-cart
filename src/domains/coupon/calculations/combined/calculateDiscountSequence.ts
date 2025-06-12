import { CartItemWithSelection } from "../../../cart/types/response";
import { Coupon } from "../../types/response";
import { calculateCouponDiscount } from "./calculateCouponDiscount";

export const calculateDiscountSequence = (
  coupons: Coupon[],
  orderItems: CartItemWithSelection[],
  initialOrderPrice: number,
  initialShippingFee: number
): number => {
  return coupons.reduce(
    (acc, coupon) => {
      const discount = calculateCouponDiscount(
        coupon,
        orderItems,
        acc.remainingPrice,
        acc.currentShippingFee
      );

      const updatedOrderPrice = Math.max(0, acc.remainingPrice - discount);
      const updatedShippingFee =
        coupon.discountType === "freeShipping" ? 0 : acc.currentShippingFee;

      return {
        totalDiscount: acc.totalDiscount + discount,
        remainingPrice: updatedOrderPrice,
        currentShippingFee: updatedShippingFee,
      };
    },
    {
      totalDiscount: 0,
      remainingPrice: initialOrderPrice,
      currentShippingFee: initialShippingFee,
    }
  ).totalDiscount;
};
