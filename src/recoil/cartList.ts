import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from 'recoil';
import { CartId, CartItem, ProductId } from 'types';

export const cartIdMap = atom<Map<ProductId, CartId>>({
  key: 'cartId',
  default: new Map(),
});

export const cartItemAtom = atomFamily<CartItem | null, CartId>({
  key: 'cartItem',
  default: null,
});

export const countCartListSelector = selector({
  key: 'countCartListSelector',
  get: ({ get }) => {
    return [...get(cartIdMap)].length;
  },
});

export const updateCart = selectorFamily({
  key: 'updateCart',
  get:
    (productId: ProductId) =>
    ({ get }) => {
      const cartId = get(cartIdMap).get(productId);
      if (!cartId) return null;

      return get(cartItemAtom(cartId));
    },

  set:
    (productId: ProductId) =>
    ({ set, get, reset }, item) => {
      if (!item || item instanceof DefaultValue) return;

      const cartId = get(cartIdMap).get(productId) ?? item.id;

      if (item.quantity === 0) {
        reset(cartItemAtom(cartId));
      }
      set(cartItemAtom(cartId), item);
    },
});
