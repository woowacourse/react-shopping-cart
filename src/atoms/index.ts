import { atom } from 'recoil';
import type { AtomEffect } from 'recoil';
import type { CartProduct } from '../types/product';

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

export const cartState = atom<CartProduct[]>({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect<CartProduct[]>('cart_list')],
});
