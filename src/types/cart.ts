import { Product } from './product';

export type Cart = {
  id: number;
  quantity: number;
  product: Product;
  isSelected: boolean;
};
