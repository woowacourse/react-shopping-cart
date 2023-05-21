import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { CartProductList } from '../types/productType';

const cartStateInit: CartProductList[] = [];

export const cartState = atom({
  key: 'CartState',
  default: cartStateInit,
});

export const cartStateLength = selector({
  key: 'CartStateLength',
  get: ({ get }) => {
    const cartStateLength = get(cartState).length;

    return cartStateLength;
  },
});

export const cartItemQuantityStateFamily = selectorFamily({
  key: 'CartItemQuantityStateFamily',
  get:
    (id: number) =>
    ({ get }) => {
      const cartItem = get(cartState).filter(
        (cartItem) => cartItem.id === id
      )[0];

      if (!cartItem) return 0;
      return cartItem.quantity;
    },
});

export const cartStateRequestQuery = atomFamily({
  key: 'cartStateRequestQuery',
  default: { action: 'get', payload: {} },
});

export const cartStateActionState = selectorFamily({
  key: 'CartStateActionState',
  get:
    (id: number) =>
    async ({ get }) => {
      const { action, payload } = get(cartStateRequestQuery(id));

      switch (action) {
        case 'get': // get
      }
    },
});
