type DiscountType = 'fixed' | 'percentage' | 'buyXgetY' | 'freeShipping';

export const DISCOUNT_TYPE: Record<string, DiscountType> = {
  fixed: 'fixed',
  percentage: 'percentage',
  buyXgetY: 'buyXgetY',
  freeShipping: 'freeShipping',
};

export interface Coupon {
  id: number;
  code: string;
  description: string;
  discountType: DiscountType;
  expirationDate: string;
}

export interface FixedCoupon extends Coupon {
  discount: number;
  minimumAmount: number;
}

export interface BuyXGetYCoupon extends Coupon {
  buyQuantity: number;
  getQuantity: number;
}

export interface FreeShippingCoupon extends Coupon {
  minimumAmount: number;
}

export interface PercentageCoupon extends Coupon {
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
}
