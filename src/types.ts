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

export interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  discountType: DiscountType;
}

export type DiscountType = 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';
