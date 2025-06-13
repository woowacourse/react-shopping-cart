export type CouponResponse = {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
};

export type Coupon = {
  checked: boolean;
  disabled: boolean;
} & CouponResponse;
