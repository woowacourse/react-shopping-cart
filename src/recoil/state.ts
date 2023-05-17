import type { CartType } from '../types';
import type { AtomEffect } from 'recoil';

import { atom, selector } from 'recoil';
import { LOCAL_STORAGE_KEY } from '../constants';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue !== null) setSelf(JSON.parse(localStorageValue));

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const cartState = atom<CartType>({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect(LOCAL_STORAGE_KEY.cart)],
});

export const cartCountState = selector({
  key: 'cartCountState',
  get: ({ get }) => get(cartState).length,
});
