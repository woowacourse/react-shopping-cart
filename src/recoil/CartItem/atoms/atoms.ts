import { atom, AtomEffect } from 'recoil';
import type { TCartItem } from '../../../types/CartItem.type';

const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const selectedCartItemListState = atom<TCartItem[]>({
  key: 'selectedCartItemListState',
  default: [],
  effects: [localStorageEffect<TCartItem[]>('selectedCartItemListState')],
});

export const isSigolState = atom<boolean>({
  key: 'isSigolState',
  default: false,
});
