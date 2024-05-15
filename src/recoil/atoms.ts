import { atom } from 'recoil';
import { KEYS } from '../constants/constants';

export interface SelectedCartItem {
  cartItemId: number;
  quantity: number;
  price: number;
}

export const selectedCartItems = atom<SelectedCartItem[]>({
  key: KEYS.CART_ITEMS,
  default: [],
});
