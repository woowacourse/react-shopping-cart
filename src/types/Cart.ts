import { Product } from './Product';

export interface ServerCartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface LocalCartItem {
  price?: number;
  quantity: number;
}

export type LocalCart = Record<number, LocalCartItem>;

export type LocalCartToggle = Record<number, boolean>;
