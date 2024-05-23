import { COUPON_DISCOUNT_TYPE } from "../../../constants/couponDiscountType";
import {
  BuyXGetYCoupon,
  FixedDiscountCoupon,
  FreeShippingCoupon,
  PercentageDiscountCoupon,
} from "../../../types/coupon";
import { RawCoupon } from "../../../types/rawCoupon";

export const isFixedDiscountCoupon = (coupon: RawCoupon): coupon is FixedDiscountCoupon => {
  return coupon.discountType === COUPON_DISCOUNT_TYPE.fixed;
};

export const isPercentageDiscountCoupon = (
  coupon: RawCoupon
): coupon is PercentageDiscountCoupon => {
  return coupon.discountType === COUPON_DISCOUNT_TYPE.percentage;
};

export const isBuyXGetYCoupon = (coupon: RawCoupon): coupon is BuyXGetYCoupon => {
  return coupon.discountType === COUPON_DISCOUNT_TYPE.buyXgetY;
};

export const isFreeShippingCoupon = (coupon: RawCoupon): coupon is FreeShippingCoupon => {
  return coupon.discountType === COUPON_DISCOUNT_TYPE.freeShipping;
};
