import { Product } from './product.type';

export interface CartItemType {
  id: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  content: CartItemType[];
  empty: boolean;
}

export interface FilteredCartItemStateType {
  id: number;
  quantity: number;
  price: number;
  isSelected: boolean;
}
