import { atom, atomFamily } from 'recoil';

import { CartItem } from '../type';

export const cartItemsState = atom<CartItem[]>({
  key: 'cartItemsState',
  default: [],
});

export const itemQuantityState = atomFamily<number, number>({
  key: 'itemQuantityState',
  default: 1,
});

export const isCheckedItemIdsState = atom<Record<number, boolean>>({
  key: 'isCheckedItemIdsState',
  default: {},
});
