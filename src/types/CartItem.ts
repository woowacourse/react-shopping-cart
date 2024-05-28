import type { Product } from './Product';

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};
