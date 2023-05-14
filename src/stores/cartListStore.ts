import { AtomEffect, atom, selector, selectorFamily } from 'recoil';
import { CartList } from '../types/CartList.ts';
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

export const cartListAtom = atom<CartList>({
  key: 'cartListAtom',
  default: {},
  effects: [cartItemsLocalStorageEffect<CartList>(LOCAL_STORAGE_KEY.CART_ITEMS)],
});

export const cartItemsQuantitySelector = selector({
  key: 'cartItemsQuantitySelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);

    return Object.keys(cartList).length;
  },
});

export const productQuantitySelector = selectorFamily({
  key: 'productQuantitySelector',
  get:
    (itemId: number) =>
    ({ get }) => {
      const cartList = get(cartListAtom);

      return cartList[itemId]?.quantity ?? 0;
    },
});
