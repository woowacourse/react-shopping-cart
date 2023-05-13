import { atom } from 'recoil';
import type { AtomEffect } from 'recoil';
import type { CartItem } from '../../types/product';
import { CART_LOCAL_STORAGE_KEY } from '../../constants';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect<CartItem[]>(CART_LOCAL_STORAGE_KEY)],
});
