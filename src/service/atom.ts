import { atom, selector } from 'recoil';
import type { AtomEffect } from 'recoil';
import type { CartItem } from '../types/types';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const localValue = localStorage.getItem(key);
    if (localValue) {
      setSelf(JSON.parse(localValue));
    }
    onSet((newValue, _, isReset) =>
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue)),
    );
  };

export const cartListState = atom<CartItem[]>({
  key: 'cartLists',
  default: [],
  effects: [localStorageEffect<CartItem[]>('cartList')],
});

export const cartItemTotalQuantityState = selector({
  key: 'totalQuantity',
  get: ({ get }) => {
    const cartList = get(cartListState);

    return cartList.map((cartItem) => cartItem.quantity).reduce((prev, curr) => prev + curr, 0);
  },
});
