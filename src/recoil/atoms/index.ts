import { atom } from 'recoil';
import { cartItemsQuery } from '../selectors';
import type { CartItem } from '../../types/product';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: cartItemsQuery,
});
