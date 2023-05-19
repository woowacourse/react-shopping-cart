import { atom } from 'recoil';
import { cartListQuery } from './selector';
import type { CartItem } from '../types/types';

export const cartListState = atom<CartItem[]>({
  key: 'cartListState',
  default: cartListQuery,
});

export const checkedArrayState = atom<CartItem[]>({
  key: 'checkedArrayState',
  default: [],
});
