export type CouponDiscountType =
  | "fixed"
  | "percentage"
  | "buyXgetY"
  | "freeShipping";

export interface CouponType {
  id: number;
  code: string;
  description: string;
  discountType: CouponDiscountType;
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
}
