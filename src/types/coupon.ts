interface BaseCoupon {
  id: number;
  description: string;
  code: string;
  expirationDate: string;
  minimumAmount?: number;
  availableTime?: {
    start: string;
    end: string;
  };
}

export interface FixedCoupon extends BaseCoupon {
  discountType: 'fixed';
  discount: number;
}

export interface BuyXGetYCoupon extends BaseCoupon {
  discountType: 'buyXgetY';
  buyQuantity: number;
  getQuantity: number;
}

export interface FreeShippingCoupon extends BaseCoupon {
  discountType: 'freeShipping';
}

export interface PercentageCoupon extends BaseCoupon {
  discountType: 'percentage';
  discount: number;
}

export type Coupon = FixedCoupon | BuyXGetYCoupon | FreeShippingCoupon | PercentageCoupon;
