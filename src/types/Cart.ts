import { Product } from './Product';

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export type LocalCartToggle = Record<number, boolean>;
