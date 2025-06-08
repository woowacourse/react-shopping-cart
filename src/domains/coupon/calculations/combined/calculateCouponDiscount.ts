import { CartItemWithSelection } from "../../../cart/types/response";
import { Coupon } from "../../types/response";
import {
  calculateBuyXGetYDiscount,
  calculateFixedDiscount,
  calculatePercentageDiscount,
  calculateShippingDiscount,
} from "../basic";

export const calculateCouponDiscount = (
  coupon: Coupon,
  orderItems: CartItemWithSelection[],
  orderPrice: number,
  shippingFee: number
): number => {
  switch (coupon.discountType) {
    case "fixed":
      return calculateFixedDiscount(coupon, orderPrice);
    case "percentage":
      return calculatePercentageDiscount(coupon, orderPrice);
    case "buyXgetY":
      return calculateBuyXGetYDiscount(coupon, orderItems);
    case "freeShipping":
      return calculateShippingDiscount(coupon, orderPrice, shippingFee);
    default:
      return 0;
  }
};
