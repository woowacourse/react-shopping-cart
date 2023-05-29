import { selector } from 'recoil';
import { cartItemsState } from './atom';

export const cartItemsLengthSelector = selector({
  key: 'cartItemsLengthSelector',
  get: ({ get }) => Object.keys(get(cartItemsState)).length,
});

export const checkedCartItemsLengthSelector = selector({
  key: 'checkedCartItemsSelector',
  get: ({ get }) => {
    return Object.values(get(cartItemsState)).filter(
      checkedCartItem => checkedCartItem.isChecked
    ).length;
  },
});
