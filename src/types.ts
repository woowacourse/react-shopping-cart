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

export interface CouponProps {
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

export interface selectedItems {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  isSelected: boolean;
}
