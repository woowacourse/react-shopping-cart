export type CouponDiscountType = 'fixed' | 'percentage' | 'buyXgetY' | 'freeShipping';

export type ResponseCoupon = {
  id: number;
  code: string;
  description: string;
  discount?: number;
  discountType: CouponDiscountType;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  expirationDate: string;
};

export type CouponPriority = 0 | 1 | 2;

export type Coupon = ResponseCoupon & {
  priority: CouponPriority;
};
