interface BaseCoupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string; // YYYY-MM-DD
  discountType: "fixed" | "buyXgetY" | "freeShipping" | "percentage";
}

interface FixedDiscountCoupon extends BaseCoupon {
  discountType: "fixed";
  discount: number;
  minimumAmount?: number;
}

interface BuyXGetYCoupon extends BaseCoupon {
  discountType: "buyXgetY";
  buyQuantity: number;
  getQuantity: number;
}

interface FreeShippingCoupon extends BaseCoupon {
  discountType: "freeShipping";
  minimumAmount?: number;
}

interface PercentageDiscountCoupon extends BaseCoupon {
  discountType: "percentage";
  discount: number;
  minimumAmount?: number;
  availableTime?: {
    start: string; // HH:MM:SS 형식
    end: string; // HH:MM:SS 형식
  };
}

export type Coupon =
  | FixedDiscountCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon
  | PercentageDiscountCoupon;
