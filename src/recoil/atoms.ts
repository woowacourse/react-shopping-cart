import { atom } from 'recoil';
import { RECOIL_KEYS } from '../constants/constants';
import localStorageEffect from '../utils/localStorageEffect';

export interface SelectedCartItem {
  cartItemId: number;
  quantity: number;
  price: number;
}

export const selectedCartItems = atom<SelectedCartItem[]>({
  key: RECOIL_KEYS.CART_ITEMS,
  default: [],
  effects: [localStorageEffect<SelectedCartItem[]>(RECOIL_KEYS.CART_ITEMS)],
});
