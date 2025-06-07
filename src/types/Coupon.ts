export type Coupon =
  | FixedDiscountCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon
  | PercentageDiscountCoupon;

type BaseCoupon = {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: string;
};

type FixedDiscountCoupon = BaseCoupon & {
  discount: number;
  minimumAmount: number;
};

type BuyXGetYCoupon = BaseCoupon & {
  buyQuantity: number;
  getQuantity: number;
};

type FreeShippingCoupon = BaseCoupon & {
  minimumAmount: number;
};

type PercentageDiscountCoupon = BaseCoupon & {
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
};
