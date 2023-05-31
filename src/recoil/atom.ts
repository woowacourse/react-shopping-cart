import { atom } from 'recoil';
import { CartItem } from '../types';

export const $Cart = atom<number[]>({
  key: 'Cart',
  default: [],
});

export const $CheckedCartState = atom<CartItem[]>({
  key: 'CheckedCartState',
  default: [],
});
