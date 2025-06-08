import { Coupon } from "../../types/response";

export const calculateShippingDiscount = (
  coupon: Coupon,
  orderPrice: number,
  shippingFee: number
): number => {
  if (coupon.discountType !== "freeShipping") return 0;
  if (coupon.minimumAmount && orderPrice < coupon.minimumAmount) return 0;

  return shippingFee;
};
