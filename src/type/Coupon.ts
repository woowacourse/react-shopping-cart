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
export interface BuyXGetYCoupon extends Coupon {
  discountType: "buyXgetY";
  buyQuantity: number;
  getQuantity: number;
}

/* 금액 고정 할인 */
export interface FixedCoupon extends Coupon {
  discountType: "fixed";
  discount: number;
}

/* 무료배송 */
export interface FreeShippingCoupon extends Coupon {
  discountType: "freeShipping";
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
