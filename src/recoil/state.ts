import type { CartType } from '../types';
import { atom, selector } from 'recoil';
import { LOCAL_STORAGE_KEY } from '../constants';

export const cartState = atom<CartType>({
  key: 'cartState',
  default: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.cart) ?? '[]'),
  effects: [
    ({ onSet }) => {
      onSet((newCart) => {
        localStorage.setItem(LOCAL_STORAGE_KEY.cart, JSON.stringify(newCart));
      });
    },
  ],
});

export const cartCountState = selector({
  key: 'cartCountState',
  get: ({ get }) => get(cartState).length,
});
