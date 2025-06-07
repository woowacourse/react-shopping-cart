import { Coupon } from "../types/response";

export const calculatePercentageDiscount = (
  coupon: Coupon,
  orderPrice: number
): number => {
  if (coupon.discountType !== "percentage" || !coupon.discount) return 0;
  if (coupon.minimumAmount && orderPrice < coupon.minimumAmount) return 0;

  return Math.floor(orderPrice * (coupon.discount / 100));
};
