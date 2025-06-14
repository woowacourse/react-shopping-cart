export interface BaseCoupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string; // YYYY-MM-DD
  discountType: "fixed" | "buyXgetY" | "freeShipping" | "percentage";
}

export interface FixedDiscountCoupon extends BaseCoupon {
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

export interface PercentageDiscountCoupon extends BaseCoupon {
  discountType: "percentage";
  discount: number;
  availableTime: {
    start: string; // HH:MM:SS 형식
    end: string; // HH:MM:SS 형식
  };
}

export type Coupon =
  | FixedDiscountCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon
  | PercentageDiscountCoupon;

export enum CouponType {
  FIXED = "fixed",
  BUY_X_GET_Y = "buyXgetY",
  FREE_SHIPPING = "freeShipping",
  PERCENTAGE = "percentage",
}
