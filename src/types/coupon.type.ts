import { COUPON_DISCOUNT_TYPE } from "@/constants/system";

export type CouponDiscountType = keyof typeof COUPON_DISCOUNT_TYPE;

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
