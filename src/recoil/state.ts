import type { CartType } from '../types';

import { atom, selector, selectorFamily } from 'recoil';

export const cartState = atom<CartType>({
  key: 'cartState',
  default: [],
});

export const cartCountState = selector({
  key: 'cartCountState',
  get: ({ get }) => get(cartState).length,
});

export const cartItemState = selectorFamily({
  key: 'cartItemState',
  get:
    (cartItemId) =>
    ({ get }) => {
      const cart = get(cartState);
      return cart.find(({ id }) => id === cartItemId);
    },
});

export const checkedListState = atom<boolean[]>({
  key: 'checkedListState',
  default: [],
});

export const cartBillTotalPriceState = selector({
  key: 'cartBillTotalPriceState',
  get: ({ get }) => {
    const cart = get(cartState);
    const checkedList = get(checkedListState);

    const checkedCart = cart.filter((_, index) => checkedList[index]);

    return checkedCart.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
  },
});
