import { atom } from 'recoil';
import { KEY } from '../constants/constants';
import localStorageEffect from '../utils/localStorageEffect';

export interface SelectedCartItem {
  cartItemId: number;
  quantity: number;
  price: number;
}

export const selectedCartItems = atom<SelectedCartItem[]>({
  key: KEY.CART_ITEMS,
  default: [],
  effects: [localStorageEffect<SelectedCartItem[]>(KEY.CART_ITEMS)],
});

export interface ItemQuantity {
  id: number;
  quantity: number;
}

export const itemQuantityState = atom<ItemQuantity[]>({
  key: KEY.QUANTITY_STATE,
  default: [],
});
