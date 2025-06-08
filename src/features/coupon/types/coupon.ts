export interface Coupon {
  id: number;
  code: CouponType;
  description: string;
  discountType: DiscountType;
  expirationDate?: string;
  availableTime?: AvailableTime;
  discount?: number;
  minimumAmount?: number;
}

export type CouponType = 'FIXED5000' | 'BOGO' | 'FREESHIPPING' | 'MIRACLESALE';

export type DiscountType = 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';

export type AvailableTime = {
  start: string;
  end: string;
};
