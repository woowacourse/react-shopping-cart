import { Product } from './product.type';

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  content: CartItem[];
  empty: boolean;
}
