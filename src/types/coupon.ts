interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: string;
}

interface PercentageCoupon extends Coupon {
  discount: number;
  minimumAmount: number;
}

interface BuyXGetYCoupon extends Coupon {
  buyQuantity: number;
  getQuantity: number;
}

interface FreeShippingCoupon extends Coupon {
  minimumAmount: number;
}

interface TimeCoupon extends Coupon {
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
}

export type CouponType =
  | PercentageCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon
  | TimeCoupon;
