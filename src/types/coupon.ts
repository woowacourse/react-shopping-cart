export type AvailableTime = {
  start: string;
  end: string;
};

export interface Coupon {
  id: number;
  code: string;
  description: string;
  discount?: number;
  discountType: "fixed" | "percentage" | "buyXgetY" | "freeShipping";
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: AvailableTime;
  expirationDate: string;
}
