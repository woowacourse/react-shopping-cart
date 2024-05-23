import {
  BuyXGetYRawCoupon,
  FixedDiscountRawCoupon,
  FreeShippingRawCoupon,
  PercentageDiscountRawCoupon,
} from "./rawCoupon";

export type Coupon =
  | FixedDiscountCoupon
  | PercentageDiscountCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon;

type WithSelectionStatus<T> = T & { isSelected: boolean; isSelectable: boolean };

export type FixedDiscountCoupon = WithSelectionStatus<FixedDiscountRawCoupon>;

export type PercentageDiscountCoupon = WithSelectionStatus<PercentageDiscountRawCoupon>;

export type BuyXGetYCoupon = WithSelectionStatus<BuyXGetYRawCoupon>;

export type FreeShippingCoupon = WithSelectionStatus<FreeShippingRawCoupon>;
