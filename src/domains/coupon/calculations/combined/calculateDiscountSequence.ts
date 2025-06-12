import { CartItemWithSelection } from "../../../cart/types/response";
import { Coupon } from "../../types/response";
import { calculateCouponDiscount } from "./calculateCouponDiscount";

interface Props {
  coupons: Coupon[];
  orderItems: CartItemWithSelection[];
  initialOrderPrice: number;
  initialShippingFee: number;
}

export const calculateDiscountSequence = ({
  coupons,
  orderItems,
  initialOrderPrice,
  initialShippingFee,
}: Props): number => {
  return coupons.reduce(
    (acc, coupon) => {
      const discount = calculateCouponDiscount({
        coupon,
        orderItems,
        orderPrice: acc.remainingPrice,
        shippingFee: acc.currentShippingFee,
      });

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
