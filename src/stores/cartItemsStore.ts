import { AtomEffect, atom, selector, selectorFamily } from 'recoil';
import type { CartItems } from '../types/index.ts';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage.ts';
import { LOCAL_STORAGE_KEY } from '../constants/index.ts';

const cartItemsLocalStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = getLocalStorage(key, null);

    if (savedValue) setSelf(savedValue);

    onSet((newValue) => {
      setLocalStorage(key, newValue);
    });
  };

export const cartItemsAtom = atom<CartItems>({
  key: 'cartItemsAtom',
  default: {},
  effects: [cartItemsLocalStorageEffect<CartItems>(LOCAL_STORAGE_KEY.CART_ITEMS)],
});

export const cartItemsQuantitySelector = selector({
  key: 'cartItemsQuantitySelector',
  get: ({ get }) => {
    const cartItems = get(cartItemsAtom);

    return Object.keys(cartItems).length;
  },
});

export const productQuantitySelector = selectorFamily({
  key: 'productQuantitySelector',
  get:
    (itemId: number) =>
    ({ get }) => {
      const cartItems = get(cartItemsAtom);

      return cartItems[itemId]?.quantity ?? 0;
    },
});
