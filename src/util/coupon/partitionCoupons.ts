import { validateCoupon } from "./validateCoupon";
import type { InvalidReason } from "@/type/Coupon";
import type { Coupon } from "@/type/Coupon";
import type { CartItem } from "@/type/CartItem";

export const partitionCoupons = (
  coupons: Coupon[],
  items: CartItem[],
  now = new Date()
) => {
  const validCoupons = new Set<Coupon>();
  const invalidCoupons = new Set<{
    coupon: Coupon;
    invalidReason: InvalidReason;
  }>();

  coupons.forEach((coupon) => {
    const res = validateCoupon(coupon, items, now);
    if (res.isValid) {
      validCoupons.add(coupon);
    } else {
      invalidCoupons.add({
        coupon,
        invalidReason: res.invalidReason!,
      });
    }
  });

  return { validCoupons, invalidCoupons };
};
