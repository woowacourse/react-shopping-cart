import { DiscountType } from "../../types/response";

export interface ExpirationDateType {
  year: string;
  month: string;
  day: string;
}

export interface AvailableTimeType {
  hour: number;
  minute: number;
}

export interface DefaultCouponType {
  id: number;
  code: string;
  description: string;
  expirationDate: ExpirationDateType;
  discountType: DiscountType;
}

export interface FixedCouponType extends DefaultCouponType {
  discountType: "fixed";
}

export interface BuyXGetYCouponType extends DefaultCouponType {
  discountType: "buyXgetY";
  buyQuantity: number;
  getQuantity: number;
}

export interface FreeShippingCouponType extends DefaultCouponType {
  discountType: "freeShipping";
  minimumAmount: number;
}

export interface PercentageCouponType extends DefaultCouponType {
  discountType: "percentage";
  discount: number;
  availableTime: {
    start: AvailableTimeType;
    end: AvailableTimeType;
  };
}

export type CouponType =
  | FixedCouponType
  | BuyXGetYCouponType
  | FreeShippingCouponType
  | PercentageCouponType;
