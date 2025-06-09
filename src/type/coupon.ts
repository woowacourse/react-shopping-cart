export type DiscountType = 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';

export type AvailableTime = {
  start: string;
  end: string;
};

export type CouponCode = 'FIXED5000' | 'BOGO' | 'FREESHIPPING' | 'MIRACLESALE';

export type CouponType = {
  id: number;
  code: CouponCode;
  description: string;
  expirationDate: string; // 'YYYY-MM-DD'
  discountType: DiscountType;
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: AvailableTime;
};
