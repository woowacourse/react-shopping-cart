import { atom } from 'recoil';

export const countInCartState = atom({
  key: 'countInCart',
  default: 0,
});
