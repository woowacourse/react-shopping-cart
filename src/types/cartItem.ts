import { ProductType } from './product';

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductType;
}
