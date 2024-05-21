export type RawCoupon =
  | FixedDiscountCoupon
  | PercentageDiscountCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon;

export type Coupon = WithIsSelected<RawCoupon>;

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
  discountType: "fixed" | "percentage" | "buyXgetY" | "freeShipping";
  minimumAmount?: number;
  availableTime?: {
    start: TimeString;
    end: TimeString;
  };
}

interface FixedDiscountCoupon extends BaseCoupon {
  discountType: "fixed";
  discount: number;
}

interface PercentageDiscountCoupon extends BaseCoupon {
  discountType: "percentage";
  discount: number;
}

interface BuyXGetYCoupon extends BaseCoupon {
  discountType: "buyXgetY";
  buyQuantity: number;
  getQuantity: number;
}

interface FreeShippingCoupon extends BaseCoupon {
  discountType: "freeShipping";
}

type WithIsSelected<T> = T & { isSelected: boolean };
