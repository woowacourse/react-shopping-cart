export interface Coupon {
  id: string;
  code: string;
  description: string;
  expirationDate: Date;
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

export type InvalidReason =
  | "expired"
  | "minAmount"
  | "timeRange"
  | "bogoQty"
  | "invalidType";
