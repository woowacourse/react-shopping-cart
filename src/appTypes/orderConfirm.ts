interface BaseCoupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
}

interface FixedDiscountCoupon extends BaseCoupon {
  discountType: 'fixed';
  discount: number;
  minimumAmount: number;
}

interface PercentageDiscountCoupon extends BaseCoupon {
  discountType: 'percentage';
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
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

export type Coupon = FixedDiscountCoupon | PercentageDiscountCoupon | BuyXGetYCoupon | FreeShippingCoupon;
