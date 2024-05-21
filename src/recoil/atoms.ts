import { atom } from 'recoil';
import { RECOIL_KEYS } from '../constants/constants';
import localStorageEffect from '../utils/localStorageEffect';
import { CartItem } from '../types/cartItem';

export const selectedCartItems = atom<CartItem[]>({
  key: RECOIL_KEYS.CART_ITEMS,
  default: [],
  effects: [localStorageEffect<CartItem[]>(RECOIL_KEYS.CART_ITEMS)],
});
