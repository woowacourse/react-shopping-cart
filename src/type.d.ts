export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

interface CouponBase {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: string;
}

export interface FixedDiscountCoupon extends CouponBase {
  discountType: 'fixed';
  discount: number;
  minimumAmount: number;
}

export interface BuyXGetYCoupon extends CouponBase {
  discountType: 'buyXgetY';
  buyQuantity: number;
  getQuantity: number;
}

export interface FreeShippingCoupon extends CouponBase {
  discountType: 'freeShipping';
  minimumAmount: number;
}

export interface PercentageDiscountCoupon extends CouponBase {
  discountType: 'percentage';
  discount: number;
  availableTime: { start: string; end: string };
}

export type Coupon =
  | FixedDiscountCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon
  | PercentageDiscountCoupon;
