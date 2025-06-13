export type CouponType = "buyXgetY" | "fixed" | "percentage" | "freeShipping";

export interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: CouponType;
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: AvailableTime;
}

export interface AvailableTime {
  start: string;
  end: string;
}
