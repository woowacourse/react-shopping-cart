export const COUPON_DISCOUNT_TYPE = {
  fixed: "fixed",
  percentage: "percentage",
  buyXgetY: "buyXgetY",
  freeShipping: "freeShipping",
} as const;

export type CouponDiscountType = (typeof COUPON_DISCOUNT_TYPE)[keyof typeof COUPON_DISCOUNT_TYPE];

export type FixedDiscount = typeof COUPON_DISCOUNT_TYPE.fixed;

export type PercentageDiscount = typeof COUPON_DISCOUNT_TYPE.percentage;

export type BuyXGetY = typeof COUPON_DISCOUNT_TYPE.buyXgetY;

export type FreeShipping = typeof COUPON_DISCOUNT_TYPE.freeShipping;
