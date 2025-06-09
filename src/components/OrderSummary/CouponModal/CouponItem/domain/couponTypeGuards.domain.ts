import {
  BuyXGetYCoupon,
  CouponType,
  FixedCoupon,
  FreeShippingCoupon,
  PercentageCoupon,
} from "../../../../../types/coupon";

export function isFixedCoupon(coupon: CouponType): coupon is FixedCoupon {
  return coupon.discountType === "fixed";
}

export function isBuyXGetYCoupon(coupon: CouponType): coupon is BuyXGetYCoupon {
  return coupon.discountType === "buyXgetY";
}

export function isFreeShippingCoupon(
  coupon: CouponType
): coupon is FreeShippingCoupon {
  return coupon.discountType === "freeShipping";
}

export function isPercentageCoupon(
  coupon: CouponType
): coupon is PercentageCoupon {
  return coupon.discountType === "percentage";
}
