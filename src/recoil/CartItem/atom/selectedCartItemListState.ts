import { atom, AtomEffect } from 'recoil';
import type { CartItem } from '../../../types/CartItem.type';

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

export const selectedCartItemListState = atom<CartItem[]>({
  key: 'selectedCartItemListState',
  default: [],
  effects: [localStorageEffect<CartItem[]>('selectedCartItemListState')],
});
