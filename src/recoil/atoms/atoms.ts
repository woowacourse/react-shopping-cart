import { atom } from 'recoil';
import { CartItem, selectedItems } from '../../types';
import { getLocalStorage } from '../../utils/getLocalStorage';

export const cartItemsState = atom<CartItem[]>({
  key: 'cartItemsState',
  default: [],
});

export const selectedItemsState = atom<Record<number, selectedItems>>({
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

export const cartErrorMessageState = atom<string>({
  key: 'cartErrorMessage',
  default: '',
});
