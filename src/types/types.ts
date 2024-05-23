export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CouponBase {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: DiscountType;
}

export type DiscountType = "fixed" | "BuyXGetY" | "freeShipping" | "percentage";

export type DiscountCondition = BuyXGetYCondition | MinimumAmountCondition | AvailableTimeCondition;
export type DiscountConditionType = "";

export interface BuyXGetYCondition {
  buyQuantity: number;
  getQuantity: number;
}
export interface MinimumAmountCondition {
  minimumAmount: number;
}
export interface AvailableTimeCondition {
  availableTime: AvailableTime;
}

export interface AvailableTime {
  start: string;
  end: string;
}
