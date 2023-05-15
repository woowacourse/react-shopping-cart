import { atom } from 'recoil';

export const $Cart = atom<number[]>({
  key: 'Cart',
  default: [],
});
