export type DiscountType = "fixed" | "buyXgetY" | "freeShipping" | "percentage";

interface BaseCoupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: DiscountType;
}

export interface FixedCoupon extends BaseCoupon {
  discountType: "fixed";
  discount: number;
  minimumAmount: number;
}

export interface BuyXGetYCoupon extends BaseCoupon {
  discountType: "buyXgetY";
  buyQuantity: number;
  getQuantity: number;
}

export interface FreeShippingCoupon extends BaseCoupon {
  discountType: "freeShipping";
  minimumAmount: number;
}

export interface PercentageCoupon extends BaseCoupon {
  discountType: "percentage";
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
}

export type CouponType =
  | FixedCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon
  | PercentageCoupon;
