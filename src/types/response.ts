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

export interface CouponDataType {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: string;
  discount: number;
  minimumAmount: number;
}

interface expirationDate {
  year: string;
  month: string;
  day: string;
}

export interface CouponType {
  id: number;
  code: string;
  description: string;
  expirationDate: expirationDate;
  discountType: string;
  discount: number;
  minimumAmount: number;
}

export type FetchResponseType = {
  cartItems: CartItemType[];
  cartItemsUpdate: void;
  coupons: CouponDataType[];
};

export type FetchKeyType = keyof FetchResponseType;
