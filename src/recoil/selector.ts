import { selector } from 'recoil';
import { cartItemsState } from './atom';

export const cartItemsLengthSelector = selector({
  key: 'cartItemsLengthSelector',
  get: ({ get }) => Object.keys(get(cartItemsState)).length,
});
