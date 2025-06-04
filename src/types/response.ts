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

interface expirationDate {
  year: string;
  month: string;
  day: string;
}

export interface FixedCouponDataType {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: string;
  discount: number;
  minimumAmount: number;
}

export interface FixedCouponType {
  id: number;
  code: string;
  description: string;
  expirationDate: expirationDate;
  discountType: string;
  discount: number;
  minimumAmount: number;
}

export interface BuyXGetYCouponDataType {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: string;
  buyQuantity: number;
  getQuantity: number;
}

export interface BuyXGetYCouponType {
  id: number;
  code: string;
  description: string;
  expirationDate: expirationDate;
  discountType: string;
  buyQuantity: number;
  getQuantity: number;
}

export interface FreeShippingCouponDataType {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: string;
  minimumAmount: number;
}

export interface FreeShippingCouponType {
  id: number;
  code: string;
  description: string;
  expirationDate: expirationDate;
  discountType: string;
  minimumAmount: number;
}

export interface PercentageCouponDataType {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: string;
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
}

interface availableTime {
  hourPeriod: string;
  hour: number;
  minute: number;
}

export interface PercentageCouponType {
  id: number;
  code: string;
  description: string;
  expirationDate: expirationDate;
  discountType: string;
  discount: number;
  availableTime: {
    start: availableTime;
    end: availableTime;
  };
}

export type CouponDataType =
  | FixedCouponDataType
  | BuyXGetYCouponDataType
  | FreeShippingCouponDataType
  | PercentageCouponDataType;

export type CouponType =
  | FixedCouponType
  | BuyXGetYCouponType
  | FreeShippingCouponType
  | PercentageCouponType;

export type FetchResponseType = {
  cartItems: CartItemType[];
  cartItemsUpdate: void;
  coupons: CouponDataType[];
};

export type FetchKeyType = keyof FetchResponseType;
