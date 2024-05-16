import { atom, atomFamily } from 'recoil';

import { CartItem } from '../type';
import { cartItemsState } from './selectors';

export const currentCartItemsState = atom<CartItem[]>({
  key: 'currentCartItemsState',
  default: cartItemsState,
});

export const itemQuantityState = atomFamily<number, number>({
  key: 'itemQuantityState',
  default: 1,
});

export const isCheckedItemIdsState = atom<Record<number, boolean>>({
  key: 'isCheckedItemIdsState',
  default: {},
});
