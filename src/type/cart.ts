import { Product } from './product';

export interface CartType {
  id: number;
  quantity: number;
  product: Product;
}
