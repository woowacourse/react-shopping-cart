import { BuyXGetYCoupon, Coupon } from "@/type/Coupon";

// utils/typeGuard.ts
export const isBogo = (c: Coupon): c is BuyXGetYCoupon =>
  c.discountType === "buyXgetY";
