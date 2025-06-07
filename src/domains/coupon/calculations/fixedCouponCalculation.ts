import { Coupon } from "../types/response";

export const calculateFixedDiscount = (
  coupon: Coupon,
  orderPrice: number
): number => {
  if (coupon.discountType !== "fixed" || !coupon.discount) return 0;
  if (coupon.minimumAmount && orderPrice < coupon.minimumAmount) return 0;

  return coupon.discount;
};
