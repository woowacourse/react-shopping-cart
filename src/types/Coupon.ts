export type DiscountType = "fixed" | "buyXgetY" | "freeShipping" | "percentage";

export interface CouponType {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  discountType: DiscountType;
}
