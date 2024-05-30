import { COUPON_DISCOUNT_TYPE } from "../constants/couponDiscountType";

export type CouponDiscountType = FixedDiscount | PercentageDiscount | BuyXGetY | FreeShipping;

export type FixedDiscount = typeof COUPON_DISCOUNT_TYPE.fixed;

export type PercentageDiscount = typeof COUPON_DISCOUNT_TYPE.percentage;

export type BuyXGetY = typeof COUPON_DISCOUNT_TYPE.buyXgetY;

export type FreeShipping = typeof COUPON_DISCOUNT_TYPE.freeShipping;
