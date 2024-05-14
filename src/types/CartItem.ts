import { Product } from './Product';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}
