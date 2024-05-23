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

export interface CouponClint extends Coupon {
  isChecked: boolean;
}

export interface AvailableTime {
  start: string;
  end: string;
}

export type CouponCode = 'FIXED5000' | 'BOGO' | 'FREESHIPPING' | 'MIRACLESALE';
export type CouponDiscountType = 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';
