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

export type QuantityControlType = 'increase' | 'decrease';

/**
 * fetchCoupons를 통해 받아온 쿠폰 정보의 availableTime 항목에는
 * start, end 모두 "HH:MM:SS" 형태의 문자열을 가집니다.
 */
export type CouponAvailableTimeType = {
  start: string;
  end: string;
};
export interface Coupon {
  id: number;
  code: string;
  description: string;
  discount?: number;
  discountType: 'fixed' | 'percentage' | 'buyXgetY' | 'freeShipping';
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: CouponAvailableTimeType;
  expirationDate: string;
}
