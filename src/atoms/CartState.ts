import { atom, selector, selectorFamily } from 'recoil';
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
      const cartItemQuantity = get(cartState).filter(
        (cartItem) => cartItem.id === id
      )[0];

      if (!cartItemQuantity) return 0;
      return cartItemQuantity.quantity;
    },
});
