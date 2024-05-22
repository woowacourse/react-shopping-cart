export interface ProductType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductType;
}

const DISCOUNT_TYPE = {
  FIXED: "fixed",
  BUY_X_GET_Y: "buyXgetY",
  FREE_SHIPPING: "freeShipping",
  PERCENTAGE: "percentage",
} as const;

export type DiscountType = (typeof DISCOUNT_TYPE)[keyof typeof DISCOUNT_TYPE];

export interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: AvailableTime;
  discountType: DiscountType;
}

export interface AvailableTime {
  start: string;
  end: string;
}
