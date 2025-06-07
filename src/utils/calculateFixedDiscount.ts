import { FixedDiscountCoupon } from "../types/type";
import { isValidExpiration } from "./isValidExpiration";

export const calculateFixedDiscount = (
  orderPrice: number,
  coupon: FixedDiscountCoupon
) => {
  if (!isValidExpiration(coupon.expirationDate)) return 0;
  if (coupon.minimumAmount > orderPrice) return 0;
  return coupon.discount;
};
