import { DISCOUNT_TYPE_KEY } from "../constants/coupon";

export type CategoryType = "전체" | "식료품" | "패션잡화";

export interface ProductItemType {
  id: number;
  name: string;
  category: CategoryType;
  price: number;
  imageUrl: string;
}

export interface CartItemType {
  id: number;
  product: ProductItemType;
  quantity: number;
}

export type DiscountType = keyof typeof DISCOUNT_TYPE_KEY;

export interface BaseCouponDataType {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: DiscountType;
}

export interface FixedCouponDataType extends BaseCouponDataType {
  discountType: "fixed";
  discount: number;
  minimumAmount: number;
}

export interface BuyXGetYCouponDataType {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: "buyXgetY";
  buyQuantity: number;
  getQuantity: number;
}

export interface FreeShippingCouponDataType {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: "freeShipping";
  minimumAmount: number;
}

export interface PercentageCouponDataType {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: "percentage";
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
}

export type CouponDataType =
  | FixedCouponDataType
  | BuyXGetYCouponDataType
  | FreeShippingCouponDataType
  | PercentageCouponDataType;

export type FetchResponseType = {
  cartItems: CartItemType[];
  cartItemsUpdate: void;
  coupons: CouponDataType[];
};

export type FetchKeyType = keyof FetchResponseType;
