import { atom } from 'recoil';
import { KEY } from '../constants/constants';
import syncWithLocalStorage from '../utils/syncWithLocalStorage';

export interface SelectedCartItem {
  cartItemId: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export const selectedCartItems = atom<SelectedCartItem[]>({
  key: KEY.CART_ITEMS,
  default: [],
  effects: [syncWithLocalStorage<SelectedCartItem[]>(KEY.CART_ITEMS)],
});

export interface ItemQuantity {
  id: number;
  quantity: number;
}

export const itemQuantityState = atom<ItemQuantity[]>({
  key: KEY.QUANTITY_STATE,
  default: [],
});
