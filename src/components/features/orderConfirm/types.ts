export interface CouponDiscount {
  coupon: Coupon;
  discount: number;
}

interface BaseCoupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';
}

interface FixedCoupon extends BaseCoupon {
  discountType: 'fixed';
  discount: number;
  minimumAmount: number;
}

interface BuyXGetYCoupon extends BaseCoupon {
  discountType: 'buyXgetY';
  buyQuantity: number;
  getQuantity: number;
}

interface FreeShippingCoupon extends BaseCoupon {
  discountType: 'freeShipping';
  minimumAmount: number;
}

interface PercentageCoupon extends BaseCoupon {
  discountType: 'percentage';
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
}

export type Coupon =
  | FixedCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon
  | PercentageCoupon;
