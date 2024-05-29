import { CouponCode, DiscountType } from '@/constants/coupon';

export interface Coupon {
  id: number;
  code: CouponCodeType;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  discountType: CouponDiscountType;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: AvailableTime;
}

export interface CouponClient extends Coupon {
  isChecked: boolean;
}

export interface AvailableTime {
  start: AvailableTimeFormat;
  end: AvailableTimeFormat;
}

export type CouponCodeType = keyof typeof CouponCode;

export type CouponDiscountType = keyof typeof DiscountType;

type Hour = '04' | '07';

export type AvailableTimeFormat = `${Hour}:00:00`;
