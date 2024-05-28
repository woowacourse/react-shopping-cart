import { COUPON_DISCOUNT_TYPE } from "../../constants/couponDiscountType";
import {
  BuyXGetYCoupon,
  FixedDiscountCoupon,
  FreeShippingCoupon,
  PercentageDiscountCoupon,
} from "../../types/coupon";
import { CouponResponse } from "../../types/couponResponses";

export const isFixedDiscountCoupon = (coupon: CouponResponse): coupon is FixedDiscountCoupon => {
  return coupon.discountType === COUPON_DISCOUNT_TYPE.fixed;
};

export const isPercentageDiscountCoupon = (
  coupon: CouponResponse
): coupon is PercentageDiscountCoupon => {
  return coupon.discountType === COUPON_DISCOUNT_TYPE.percentage;
};

export const isBuyXGetYCoupon = (coupon: CouponResponse): coupon is BuyXGetYCoupon => {
  return coupon.discountType === COUPON_DISCOUNT_TYPE.buyXgetY;
};

export const isFreeShippingCoupon = (coupon: CouponResponse): coupon is FreeShippingCoupon => {
  return coupon.discountType === COUPON_DISCOUNT_TYPE.freeShipping;
};
