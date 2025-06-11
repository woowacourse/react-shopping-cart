export type DiscountType = 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';

type TimeString = `${number}:${number}:${number}`;

export type AvailableTime = {
  start: TimeString;
  end: TimeString;
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
