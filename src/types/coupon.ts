import {
  BuyXGetYCouponResponse,
  FixedDiscountCouponResponse,
  FreeShippingCouponResponse,
  PercentageDiscountCouponResponse,
} from "./couponResponses";

export type Coupon =
  | FixedDiscountCoupon
  | PercentageDiscountCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon;

type WithSelectionStatus<T> = T & { isSelected: boolean; isSelectable: boolean };

export type FixedDiscountCoupon = WithSelectionStatus<FixedDiscountCouponResponse>;

export type PercentageDiscountCoupon = WithSelectionStatus<PercentageDiscountCouponResponse>;

export type BuyXGetYCoupon = WithSelectionStatus<BuyXGetYCouponResponse>;

export type FreeShippingCoupon = WithSelectionStatus<FreeShippingCouponResponse>;
