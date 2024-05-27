import type {
  BuyXGetY,
  CouponDiscountType,
  FixedDiscount,
  FreeShipping,
  PercentageDiscount,
} from "./couponDiscountType";
import type { TimeString, DateString } from "./date";

export type CouponResponse =
  | FixedDiscountCouponResponse
  | PercentageDiscountCouponResponse
  | BuyXGetYCouponResponse
  | FreeShippingCouponResponse;

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

export interface FixedDiscountCouponResponse extends BaseCoupon {
  discountType: FixedDiscount;
  discount: number;
}

export interface PercentageDiscountCouponResponse extends BaseCoupon {
  discountType: PercentageDiscount;
  discount: number;
}

export interface BuyXGetYCouponResponse extends BaseCoupon {
  discountType: BuyXGetY;
  buyQuantity: number;
  getQuantity: number;
}

export interface FreeShippingCouponResponse extends BaseCoupon {
  discountType: FreeShipping;
}
