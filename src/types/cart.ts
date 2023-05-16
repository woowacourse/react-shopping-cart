import { Product } from './products';

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
