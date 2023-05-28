import { cartItemsQuery } from '../selectors/cart';
import { atom } from 'recoil';
import type { CartItem } from '../../types/product';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: cartItemsQuery,
});
