import { Product } from './Product.type';

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};
