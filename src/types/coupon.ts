export type DiscountType = "fixed" | "buyXgetY" | "freeShipping" | "percentage";

export interface CouponResponse {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: DiscountType;

  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
}

export interface AvailableCouponType {
  code: string;
  discountAmount: number;
  selected: boolean;
}
