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

interface MinimumAmountCoupon extends CouponBase {
  minimumAmount: number;
}

interface TimeCoupon extends CouponBase {
  availableTime: { start: string; end: string };
}

export interface FixedDiscountCoupon extends MinimumAmountCoupon {
  discountType: 'fixed';
  discount: number;
}

export interface BuyXGetYCoupon extends CouponBase {
  discountType: 'buyXgetY';
  buyQuantity: number;
  getQuantity: number;
}

export interface FreeShippingCoupon extends MinimumAmountCoupon {
  discountType: 'freeShipping';
}

export interface PercentageDiscountCoupon extends TimeCoupon {
  discountType: 'percentage';
  discount: number;
}

export type Coupon =
  | FixedDiscountCoupon
  | BuyXGetYCoupon
  | FreeShippingCoupon
  | PercentageDiscountCoupon;
