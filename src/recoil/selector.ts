import { selector } from 'recoil';
import { cartItemsState } from './atom';

export const cartItemsLengthSelector = selector({
  key: 'cartItemsLengthSelector',
  get: ({ get }) => Object.keys(get(cartItemsState)).length,
});

export const productIdsSelector = selector({
  key: 'productIdsSelector',
  get: ({ get }) =>
    Object.values(get(cartItemsState)).map(cartItem => cartItem.productId),
});

export const quantityListSelector = selector({
  key: 'quantityListSelector',
  get: ({ get }) =>
    Object.values(get(cartItemsState)).map(cartItem => cartItem.quantity),
});
