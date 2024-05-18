import { TProduct } from './Product.type';

export type TCartItem = {
  id: number;
  quantity: number;
  product: TProduct;
};
