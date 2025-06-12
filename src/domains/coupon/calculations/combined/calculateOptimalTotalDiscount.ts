import { CartItemWithSelection } from "../../../cart/types/response";
import { Coupon } from "../../types/response";
import { calculateCouponDiscount } from "./calculateCouponDiscount";
import { calculateDiscountSequence } from "./calculateDiscountSequence";

export const calculateOptimalTotalDiscount = (
  coupons: Coupon[],
  orderItems: CartItemWithSelection[],
  orderPrice: number,
  shippingFee: number
) => {
  if (coupons.length === 0) return 0;
  if (coupons.length === 1) {
    return calculateCouponDiscount(
      coupons[0],
      orderItems,
      orderPrice,
      shippingFee
    );
  }
  if (coupons.length === 2) {
    const [couponA, couponB] = coupons;

    const discountAB = calculateDiscountSequence(
      [couponA, couponB],
      orderItems,
      orderPrice,
      shippingFee
    );
    const discountBA = calculateDiscountSequence(
      [couponB, couponA],
      orderItems,
      orderPrice,
      shippingFee
    );

    return Math.max(discountAB, discountBA);
  }

  return 0;
};
