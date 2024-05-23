import {
  BuyXGetY,
  CouponDiscountType,
  FixedDiscount,
  FreeShipping,
  PercentageDiscount,
} from "../constants/couponDiscountType";

export type RawCoupon =
  | FixedDiscountRawCoupon
  | PercentageDiscountRawCoupon
  | BuyXGetYRawCoupon
  | FreeShippingRawCoupon;

/**
 * @example "2024-05-21"
 */
type DateString = string;
/**
 * @example "07:00:00"
 */
type TimeString = string;

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
