import { atom } from 'recoil';
import { CartItem } from '../types';
import { getLocalStorage } from '../utils/localStorage';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: getLocalStorage<CartItem[]>('cart', []),
});
