import { atom } from 'recoil';
import type { CartProduct } from '../types/product';
export const cartState = atom<CartProduct[]>({
  key: 'cartState',
  default: [],
});
