import type { AtomEffect } from 'recoil';
import { atom } from 'recoil';
import type { CartItem } from '../types/types';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) return localStorage.removeItem(key);

      return localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const cartListState = atom<CartItem[]>({
  key: 'cartLists',
  default: [],
  effects: [localStorageEffect<CartItem[]>('cartList')],
});
