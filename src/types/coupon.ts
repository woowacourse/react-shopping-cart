export interface Coupon {
  id: number;
  code: CouponCode;
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

export type CouponCode = 'FIXED5000' | 'BOGO' | 'FREESHIPPING' | 'MIRACLESALE';
export type CouponDiscountType = 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';

type Hour = '04' | '07';

export type AvailableTimeFormat = `${Hour}:00:00`;
