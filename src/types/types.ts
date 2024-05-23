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
}

export type Coupon = CouponBase & DiscountType & DiscountCondition;

export type DiscountType = FixedDiscount | BuyXGetYDiscount | freeShippingDiscount | PercentageDiscount;
export interface FixedDiscount {
  discountType: "fixed";
  discount: number;
}

export interface BuyXGetYDiscount {
  discountType: "buyXgetY";
}
export interface freeShippingDiscount {
  discountType: "freeShipping";
}
export interface PercentageDiscount {
  discountType: "percentage";
  discount: number;
}

export type DiscountCondition = BuyXGetYCondition | MinimumAmountCondition | AvailableTimeCondition;

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
