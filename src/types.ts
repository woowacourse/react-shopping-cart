export interface ProductProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItemProps {
  id: number;
  quantity: number;
  product: ProductProps;
}

export interface CartItemCountsProps {
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
