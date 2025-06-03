import { Product } from './product';

export interface CartItemType {
  id: number;
  quantity: number;
  product: Product;
}
