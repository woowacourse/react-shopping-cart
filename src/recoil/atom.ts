import { atom } from 'recoil';

export const $Cart = atom<number[]>({
  key: 'Cart',
  default: [],
});

export const $Products = atom({
  key: 'products',
  default: [],
});
