type BaseCoupon = {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
};

type FixedCoupon = BaseCoupon & {
  discountType: "fixed";
  discount: number;
  minimumAmount: number;
};

type BuyXGetYCoupon = BaseCoupon & {
  discountType: "buyXgetY";
  buyQuantity: number;
  getQuantity: number;
};

type FreeShippingCoupon = BaseCoupon & {
  discountType: "freeShipping";
  minimumAmount: number;
};

type PercentageCoupon = BaseCoupon & {
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
