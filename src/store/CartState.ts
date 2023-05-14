import { atom } from 'recoil';
import { CartItem } from '../types';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: JSON.parse(localStorage.getItem('cart') ?? '[]'),
});
