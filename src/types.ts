export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface CartItemCounts {
  quantity: number;
}

export interface CartSummary {
  orderPrice: number;
  cartDeliveryPrice: number;
  orderDeliveryPrice: number;
  cartTotalPrice: number;
  orderTotalPrice: number;
  uniqueItemCount: number;
  totalItemCount: number;
}

export enum DiscountType {
  Fixed = "fixed",
  Percentage = "percentage",
  BuyXgetY = "buyXgetY",
  FreeShipping = "freeShipping",
}

export interface BaseCoupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
}

export interface FixedDiscountCoupon extends BaseCoupon {
  discountType: DiscountType.Fixed;
  minimumAmount: number;
  discount: number;
}

export interface PercentageDiscountCoupon extends BaseCoupon {
  discountType: DiscountType.Percentage;
  discount: number;
  availableTime: {
    start: string;
    end: string;
  };
}

export interface BuyXgetYDiscountCoupon extends BaseCoupon {
  discountType: DiscountType.BuyXgetY;
  buyQuantity: number;
  getQuantity: number;
}

export interface FreeShippingCoupon extends BaseCoupon {
  discountType: DiscountType.FreeShipping;
  minimumAmount: number;
}

export type Coupon =
  | FixedDiscountCoupon
  | PercentageDiscountCoupon
  | BuyXgetYDiscountCoupon
  | FreeShippingCoupon;

export interface AdditionalInfoProps {
  discountType: DiscountType;
  minimumAmount: number;
  buyQuantity: number;
  getQuantity: number;
  availableTime: {
    start: string;
    end: string;
  };
}
