import { atom } from 'recoil';
import { KEYS } from '../constants/constants';
import localStorageEffect from '../utils/localStorageEffect';

export interface SelectedCartItem {
  cartItemId: number;
  quantity: number;
  price: number;
}

export const selectedCartItems = atom<SelectedCartItem[]>({
  key: KEYS.CART_ITEMS,
  default: [],
  effects: [localStorageEffect<SelectedCartItem[]>(KEYS.CART_ITEMS)],
});

export interface ItemQuantity {
  id: number;
  quantity: number;
}

export const itemQuantityState = atom<ItemQuantity[]>({
  key: KEYS.QUANTITY_STATE,
  default: [],
});
