import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from 'recoil';
import { CartId, Cart, ProductId } from 'types';

export const cartIds = atom<CartId[]>({
  key: 'cartIds',
  default: [],
});

export const cartItemAtom = atomFamily<Cart | null, CartId>({
  key: 'cartItem',
  default: null,
});

export const countCartListSelector = selector({
  key: 'countCartListSelector',
  get: ({ get }) => {
    return get(cartIds).length;
  },
});

export const updateCart = selectorFamily({
  key: 'updateCart',
  get:
    (productId: ProductId) =>
    ({ get }) => {
      if (!get(cartIds).includes(productId)) return null;

      return get(cartItemAtom(productId));
    },

  set:
    (productId: ProductId) =>
    ({ set, get, reset }, item) => {
      if (!item || item instanceof DefaultValue) return;

      if (item.quantity === 0) {
        reset(cartItemAtom(productId));
      }
      set(cartItemAtom(productId), item);
    },
});
