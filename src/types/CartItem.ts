import { Item } from './Item';

export interface CartItem {
  id: number;
  product: Item;
  quantity: number;
}
