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

export const CouponCodes = {
  FIXED5000: "FIXED5000",
  BOGO: "BOGO",
  FREESHIPPING: "FREESHIPPING",
  MIRACLESALE: "MIRACLESALE",
} as const;

export type CouponCode = keyof typeof CouponCodes;
