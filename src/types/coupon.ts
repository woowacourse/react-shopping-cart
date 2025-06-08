export interface BaseCoupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: 'fixed' | 'percentage' | 'buyXgetY' | 'freeShipping';
}

export interface FixedCoupon extends BaseCoupon {
  discountType: 'fixed';
  discount: number;
  minimumAmount: number;
}

export interface PercentageCoupon extends BaseCoupon {
  discountType: 'percentage';
  discount: number;
  availableTime?: {
    start: string;
    end: string;
  };
}

export interface BuyXGetYCoupon extends BaseCoupon {
  discountType: 'buyXgetY';
  buyQuantity: number;
  getQuantity: number;
}

export interface FreeShippingCoupon extends BaseCoupon {
  discountType: 'freeShipping';
  minimumAmount: number;
}

export type Coupon =
  | FixedCoupon
  | PercentageCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon;
