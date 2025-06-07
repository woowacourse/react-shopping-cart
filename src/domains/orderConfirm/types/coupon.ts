export interface CouponType {
  id: number;
  code: CouponCode;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  discountType: string;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: AvailableTime;
}

export interface AvailableTime {
  start: string;
  end: string;
}

export type CouponCode = "FIXED5000" | "BOGO" | "FREESHIPPING" | "MIRACLESALE";
