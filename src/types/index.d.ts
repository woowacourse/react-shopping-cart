import { DISCOUNT_TYPES, DISCOUNT_CODE } from '@/constants/discount';

declare module '*.png';

export type CartItemProduct = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export interface FormattedProduct extends CartItemProduct {
  isChecked: boolean;
}

export type CartItemData = {
  id: number;
  quantity: number;
  product: FormattedProduct;
};

export interface CouponData {
  id: number;
  code: string;
  description: string;
  discount?: number;
  discountType: 'fixed' | 'percentage' | 'buyXgetY' | 'freeShipping';
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  expirationDate: string;
}

export interface isFarShippingLocationData {
  isAvailable: boolean;
  isChecked: boolean;
}

export interface FormattedCoupon extends CouponData {
  isChecked: boolean;
  isAvailable: boolean;
}

export type DiscountType = (typeof DISCOUNT_TYPES)[keyof typeof DISCOUNT_TYPES];

export type DiscounCodeType = (typeof DISCOUNT_CODE)[keyof typeof DISCOUNT_CODE];

type OmitKeys<T, K extends keyof T> = {
  [P in keyof T as Exclude<P, K>]: T[P];
};

export type CouponDataWithoutProperties = OmitKeys<
  FormattedCoupon,
  'buyQuantity' | 'getQuantity' | 'isChecked' | 'code' | 'discount' | 'discountType'
>;
