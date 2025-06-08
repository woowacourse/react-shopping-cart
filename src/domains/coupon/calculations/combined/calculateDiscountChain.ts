import { CartItemWithSelection } from "../../../cart/types/response";
import { Coupon } from "../../types/response";
import { calculateCouponDiscount } from "./calculateCouponDiscount";

export const calculateDiscountChain = (
  first: Coupon,
  second: Coupon,
  orderItems: CartItemWithSelection[],
  orderPrice: number,
  shippingFee: number
): number => {
  const firstDiscount = calculateCouponDiscount(
    first,
    orderItems,
    orderPrice,
    shippingFee
  );

  const remainingPrice = Math.max(0, orderPrice - firstDiscount);
  const shippingAfterFirst =
    first.discountType === "freeShipping" ? 0 : shippingFee;

  const secondDiscount = calculateCouponDiscount(
    second,
    orderItems,
    remainingPrice,
    shippingAfterFirst
  );

  return firstDiscount + secondDiscount;
};
