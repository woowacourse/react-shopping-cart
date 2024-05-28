export type CouponDiscountType =
  | "fixed"
  | "percentage"
  | "buyXgetY"
  | "freeShipping";

export interface Coupon {
  id: number;
  code: string;
  description: string;
  discount?: number;
  discountType: CouponDiscountType;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  expirationDate: string;
}

export interface CouponWithApplicablity extends Coupon {
  applicability: boolean;
}

export interface CouponWithPriority extends Coupon {
  priority: number;
}
