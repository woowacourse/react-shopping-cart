export interface ResponseProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  isInCart?: boolean;
  quantity?: number;
}

export interface ResponseCartItem {
  id: number;
  quantity: number;
  product: Omit<ResponseProduct, "isInCart">;
}

export interface ResponseData<T> {
  content: T[];
}

type DiscountType = "fixed" | "buyXgetY" | "freeShipping" | "percentage";

interface BaseCoupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: DiscountType;
}

interface FixedCoupon extends BaseCoupon {
  discountType: "fixed";
  discount: number;
  minimumAmount: number;
}

interface BuyXGetYCoupon extends BaseCoupon {
  discountType: "buyXgetY";
  buyQuantity: number;
  getQuantity: number;
}

interface FreeShippingCoupon extends BaseCoupon {
  discountType: "freeShipping";
  minimumAmount: number;
}

interface PercentageCoupon extends BaseCoupon {
  discountType: "percentage";
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
}

export type CouponType =
  | FixedCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon
  | PercentageCoupon;
