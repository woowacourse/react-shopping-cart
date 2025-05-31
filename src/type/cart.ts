import {Product} from './products';

export interface CartProduct {
  id: number;
  product: Product;
  quantity: number;
}
