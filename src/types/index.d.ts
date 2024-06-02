declare module '*.png';

export type ProductType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export type CartItemType = {
  id: number;
  quantity: number;
  product: ProductType;
};

export interface CouponType {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  discountType?: string;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  minimumAmount?: number;
  availableTime?: {
    start: string;
    end: string;
  };
}
