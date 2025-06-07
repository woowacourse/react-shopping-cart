type CouponCode = 'FIXED5000' | 'BOGO' | 'FREESHIPPING' | 'MIRACLESALE';

interface BaseCoupon {
  id: number;
  code: CouponCode;
  description: string;
  expirationDate: string;
  discountType: 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';
}

interface FixedCoupon extends BaseCoupon {
  discountType: 'fixed';
  code: 'FIXED5000';
  discount: number;
  minimumAmount: number;
}

interface BuyXGetYCoupon extends BaseCoupon {
  discountType: 'buyXgetY';
  code: 'BOGO';
  buyQuantity: number;
  getQuantity: number;
}

interface FreeShippingCoupon extends BaseCoupon {
  discountType: 'freeShipping';
  code: 'FREESHIPPING';
  minimumAmount: number;
}

interface PercentageCoupon extends BaseCoupon {
  discountType: 'percentage';
  code: 'MIRACLESALE';
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
}

export type CouponType = FixedCoupon | BuyXGetYCoupon | FreeShippingCoupon | PercentageCoupon;

export interface ClientCouponType {
  coupon: CouponType;
  disabled: boolean;
  checked: boolean;
  discountPrice: number;
}
