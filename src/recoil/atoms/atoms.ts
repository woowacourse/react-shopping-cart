import { atom } from 'recoil';
import { CartItem } from '../../types';
import { getLocalStorage } from '../../utils/getLocalStorage';

export const cartItemsState = atom<CartItem[]>({
  key: 'cartItemsState',
  default: [],
});

export const selectedItemsState = atom<Record<number, boolean>>({
  key: 'selectedItemsState',
  default: getLocalStorage('selectedItemsState', {}),
});

export const isAllSelectedState = atom<boolean>({
  key: 'isAllSelectedState',
  default: getLocalStorage('isAllSelectedState', false),
});

export const cartItemsCountState = atom<number>({
  key: 'cartItemsCount',
  default: 0,
});
