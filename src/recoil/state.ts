import type { CartItemType } from '../types';
import { atom, selector } from 'recoil';
import { LOCAL_STORAGE_KEY } from '../constants';

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const cartState = atom<CartItemType[]>({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect(LOCAL_STORAGE_KEY.cart)],
});

export const cartCountState = selector<number>({
  key: 'cartCountState',
  get: ({ get }) => get(cartState).length,
});
