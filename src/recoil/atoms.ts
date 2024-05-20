import { atom, atomFamily } from 'recoil';
import { CartItem } from '../type';
import { fetchCartItems } from '../apis';

export const currentCartItemsState = atom<CartItem[]>({
  key: 'currentCartItemsState',
  default: Promise.resolve(fetchCartItems()),
});

export const itemQuantityState = atomFamily<number, number>({
  key: 'itemQuantityState',
  default: 1,
});

export const isCheckedItemIdsState = atom<Record<number, boolean>>({
  key: 'isCheckedItemIdsState',
  default: {},
});
