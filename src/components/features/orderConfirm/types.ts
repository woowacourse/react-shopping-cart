interface BaseCouponType {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';
}

export interface FixedCouponType extends BaseCouponType {
  discountType: 'fixed';
  discount: number;
  minimumAmount: number;
}

export interface BuyXGetYCouponType extends BaseCouponType {
  discountType: 'buyXgetY';
  buyQuantity: number;
  getQuantity: number;
}

export interface FreeShippingCouponType extends BaseCouponType {
  discountType: 'freeShipping';
  minimumAmount: number;
}

export interface PercentageCouponType extends BaseCouponType {
  discountType: 'percentage';
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
}

export type CouponType =
  | FixedCouponType
  | BuyXGetYCouponType
  | FreeShippingCouponType
  | PercentageCouponType;
