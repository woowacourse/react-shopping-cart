import { TCartItem } from './../../pages/ShoppingCartPage/ShoppingCartPage.type';
import { atom, AtomEffect } from 'recoil';

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

export const selectedCartItemState = atom<TCartItem[]>({
  key: 'selectedCartItemState',
  default: [],
  effects: [localStorageEffect<TCartItem[]>('selectedCartItemState')],
});
