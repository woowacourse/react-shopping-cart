type BaseCoupon = {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
};

export type FixedCoupon = BaseCoupon & {
  discountType: "fixed";
  discount: number;
  minimumAmount: number;
};

export type BuyXGetYCoupon = BaseCoupon & {
  discountType: "buyXgetY";
  buyQuantity: number;
  getQuantity: number;
};

export type FreeShippingCoupon = BaseCoupon & {
  discountType: "freeShipping";
  minimumAmount: number;
};

export type PercentageCoupon = BaseCoupon & {
  discountType: "percentage";
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
};

export type Coupon =
  | FixedCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon
  | PercentageCoupon;
