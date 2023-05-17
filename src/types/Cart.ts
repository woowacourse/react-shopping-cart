import { Product } from './Product';

export interface ServerCartItem {
  id: number;
  quantity: number;
  product: Product;
}
