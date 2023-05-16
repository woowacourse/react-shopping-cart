import { AtomEffect, atom, selector } from 'recoil';
import { Cart } from '../types/cart';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const cartState = atom<Cart[]>({
  key: 'CartListState',
  default: [],
  effects: [localStorageEffect<Cart[]>('CART')],
});

export const totalAmountState = selector({
  key: 'TotalAmountState',
  get: ({ get }) => {
    return get(cartState).length;
  },
});
