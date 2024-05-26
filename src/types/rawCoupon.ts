import type {
  BuyXGetY,
  CouponDiscountType,
  FixedDiscount,
  FreeShipping,
  PercentageDiscount,
} from "../constants/couponDiscountType";
import type { TimeString, DateString } from "./date";

export type RawCoupon =
  | FixedDiscountRawCoupon
  | PercentageDiscountRawCoupon
  | BuyXGetYRawCoupon
  | FreeShippingRawCoupon;

interface BaseCoupon {
  id: number;
  code: string;
  description: string;
  expirationDate: DateString;
  discountType: CouponDiscountType;
  minimumAmount?: number;
  availableTime?: {
    start: TimeString;
    end: TimeString;
  };
}

export interface FixedDiscountRawCoupon extends BaseCoupon {
  discountType: FixedDiscount;
  discount: number;
}

export interface PercentageDiscountRawCoupon extends BaseCoupon {
  discountType: PercentageDiscount;
  discount: number;
}

export interface BuyXGetYRawCoupon extends BaseCoupon {
  discountType: BuyXGetY;
  buyQuantity: number;
  getQuantity: number;
}

export interface FreeShippingRawCoupon extends BaseCoupon {
  discountType: FreeShipping;
}
