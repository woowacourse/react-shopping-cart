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

export interface CouponType {
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
