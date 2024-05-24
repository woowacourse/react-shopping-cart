export const COUPON_DISCOUNT_TYPE = {
  fixed: "fixed",
  percentage: "percentage",
  buyXgetY: "buyXgetY",
  freeShipping: "freeShipping",
} as const;

export type CouponDiscountType = FixedDiscount | PercentageDiscount | BuyXGetY | FreeShipping;

export type FixedDiscount = typeof COUPON_DISCOUNT_TYPE.fixed;

export type PercentageDiscount = typeof COUPON_DISCOUNT_TYPE.percentage;

export type BuyXGetY = typeof COUPON_DISCOUNT_TYPE.buyXgetY;

export type FreeShipping = typeof COUPON_DISCOUNT_TYPE.freeShipping;
