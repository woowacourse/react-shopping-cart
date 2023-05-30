import { ProductItem } from './productType';

export interface CartItemProps extends ProductItem {
  quantity: number;
}
