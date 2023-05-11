import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from 'recoil';
import { CartId, CartItem, ProductId } from 'src/types';

export const cartIdMap = atom<Map<ProductId, CartId>>({
  key: 'cartId',
  default: new Map(),
});

export const cartItemAtom = atomFamily<CartItem | null, number>({
  key: 'cartItem',
  default: null,
});

export const countCartListSelector = selector({
  key: 'countCartListSelector',
  get: ({ get }) => {
    const ids = get(cartIdMap);
    const items = [...ids.values()].map((id) => get(cartItemAtom(id)));
    return items.reduce((acc, cur) => {
      if (!cur) return acc;
      return acc + cur.quantity;
    }, 0);
  },
});

export const updateCart = selectorFamily({
  key: 'updateCart',
  get:
    (productId: number) =>
    ({ get }) => {
      const ids = get(cartIdMap);
      const cartId = ids.get(productId);
      if (!cartId) return null;
      return get(cartItemAtom(cartId));
    },

  set:
    (productId: number) =>
    ({ set, get, reset }, item) => {
      if (!item || item instanceof DefaultValue) return;
      const ids = get(cartIdMap);
      const cartId = ids.get(productId) ?? item.id;
      if (item.quantity === 0) {
        reset(cartItemAtom(cartId));
      }
      set(cartItemAtom(cartId), item);
    },
});
