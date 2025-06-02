import { InvalidReason, validateCoupon } from "./validateCoupon";
import type { Coupon } from "@/type/Coupon";
import type { CartItem } from "@/type/CartItem";

export const partitionCoupons = (
  coupons: Coupon[],
  items: CartItem[],
  now = new Date()
) => {
  const validCoupons: Coupon[] = [];
  const invalidCoupons: Array<
    Coupon & { invalidReason: InvalidReason | undefined }
  > = [];

  coupons.forEach((c) => {
    const res = validateCoupon(c, items, now);
    if (res.isValid) validCoupons.push(c);
    else invalidCoupons.push({ ...c, invalidReason: res.invalidReason });
  });
  return { validCoupons, invalidCoupons };
};
