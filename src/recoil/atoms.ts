import { atom, atomFamily } from 'recoil';
import { CartItem } from '../type';
import { fetchCartItems } from '../apis';

import { AtomEffect } from 'recoil';
import { STORAGE } from '../constants';

export const cartItemsState = atom<CartItem[]>({
  key: 'cartItemsState',
  default: fetchCartItems(),
});

export const itemQuantityState = atomFamily<number, number>({
  key: 'itemQuantityState',
  default: 1,
});

export const checkedCartItemsState = atom<number[]>({
  key: 'checkedCartItemsState',
  default: JSON.parse(localStorage.getItem(STORAGE.checkedCartItems) ?? '[]') ?? [],
  effects: [localStorageEffect(STORAGE.checkedCartItems)],
});

function localStorageEffect<T>(key: string): AtomEffect<T> {
  return function ({ setSelf, onSet }) {
    const loadedData = localStorage.getItem(key);
    if (loadedData !== null) {
      setSelf(JSON.parse(loadedData));
    }

    onSet((newData: T) => {
      localStorage.setItem(key, JSON.stringify(newData));
    });
  };
}

export const fetchErrorState = atom<Error | null>({
  key: 'fetchErrorState',
  default: null,
});
