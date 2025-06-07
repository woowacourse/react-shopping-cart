export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

type Category = "패션잡화" | "식료품";

export interface Product {
  id: number;
  category: Category;
  imageUrl: string;
  name: string;
  price: number;
}

export interface AvailableTime {
  start: string;
  end: string;
}

export type DiscountType = "fixed" | "buyXgetY" | "freeShipping" | "percentage";

type BaseCoupon = {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: DiscountType;
};

export type FixedDiscountCoupon = BaseCoupon & {
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

export type PercentageDiscountCoupon = BaseCoupon & {
  discountType: "percentage";
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
};

export type Coupon =
  | FixedDiscountCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon
  | PercentageDiscountCoupon;
