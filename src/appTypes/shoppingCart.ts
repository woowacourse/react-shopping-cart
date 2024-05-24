export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export type CheckedStates = Pick<CartItem, 'id'> & { isChecked: boolean };

export type Sign = 'minus' | 'plus';

export type DiscountType = 'fixed' | 'percentage' | 'buyXgetY' | 'freeShipping';

export type AvailableTime = {
  start: string;
  end: string;
};
export interface Coupon {
  id: number;
  code: string;
  description: string;
  discount?: number;
  discountType: DiscountType;
  minimumAmount?: number;
  buyQuantity?: number;
  expirationDate: string;
  availableTime?: AvailableTime;
  getQuantity?: number;
}
