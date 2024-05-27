export type Coupon = CouponBase & DiscountType & DiscountCondition;

export interface CouponBase {
  id: number;
  code: string;
  description: string;
  expirationDate: DateType;
}
type DateType = `${number}-${number}-${number}`;

export type DiscountType = FixedDiscount | BuyXGetYDiscount | freeShippingDiscount | PercentageDiscount;
export interface FixedDiscount {
  discountType: "fixed";
  discount: number;
}

export interface BuyXGetYDiscount {
  discountType: "buyXgetY";
  buyQuantity: number;
  getQuantity: number;
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
