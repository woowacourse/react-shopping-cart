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

type BaseCoupon = {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: "fixed" | "buyXgetY" | "freeShipping" | "percentage";
};

type FixedDiscountCoupon = BaseCoupon & {
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
