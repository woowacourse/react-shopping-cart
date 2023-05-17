import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from 'recoil';
import { fetchAPI } from 'src/api';
import { CartItem, ProductId } from 'src/types';

export const cartListAtom = atom<CartItem[]>({
  //  장바구니 리스트
  key: 'cartItem',
  default: [],
});

export const countCartListSelector = selector({
  key: 'countCartListSelector',
  get: ({ get }) => {
    const list = get(cartListAtom);
    return list.length;
  },
});

export const updateCart = selectorFamily({
  key: 'updateCart',
  get:
    (productId: ProductId) =>
    ({ get }) => {
      const list = get(cartListAtom);
      const cartInfo = list.find(({ id }) => id === productId);
      return cartInfo ?? null;
    },

  set:
    (productId: ProductId) =>
    ({ set, get }, item) => {
      if (!item || item instanceof DefaultValue) return;

      const list = get(cartListAtom);
      const cartInfo = list.find(({ id }) => id === productId);

      if (!cartInfo) {
        set(cartListAtom, [...list, item]);

        return;
      }

      if (item.quantity === 0) {
        const updated = list.filter(({ id }) => id !== productId);
        set(cartListAtom, updated);
        return;
      }

      const updated = list.map((prev) => (prev.id === productId ? item : prev));

      set(cartListAtom, updated);
    },
});
