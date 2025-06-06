export interface CouponResponse {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: string;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  discountType: "fixed" | "buyXgetY" | "freeShipping" | "percentage";
}
