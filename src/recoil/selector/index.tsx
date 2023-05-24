import { DefaultValue, selector, selectorFamily } from 'recoil';
import { fetchAPI } from 'src/api';
import { cartListAtom, cartSelectedItemAtom } from '../atom';
import { CartItem, ProductId } from 'src/types';

export const cartListSelector = selector<CartItem[]>({
  key: 'cartItemSelector',
  get: async () => {
    const cartItems = await fetchAPI('/api/cart-items');

    return cartItems;
  },

  set: async ({ set }) => {
    const updatedItems = await fetchAPI('/api/cart-items');

    set(cartListAtom, updatedItems);
  },
});

export const productListSelector = selector({
  key: 'productListSelector',
  get: async () => {
    const productItems = await fetchAPI('/api/products');

    return productItems;
  },
});

export const countCartListSelector = selector({
  key: 'countCartListSelector',
  get: ({ get }) => {
    const list = get(cartListAtom);

    return list.length;
  },
});

export const updateCart = selectorFamily<CartItem | null, ProductId>({
  key: 'updateCart',
  get:
    (productId) =>
    ({ get }) => {
      const list = get(cartListAtom);

      const cartInfo = list.find(({ id }) => id === productId);
      return cartInfo ?? null;
    },
  set:
    (productId) =>
    ({ get, set }, item) => {
      if (!item || item instanceof DefaultValue) return;

      const list = get(cartListAtom);
      const updated = list.map((prev) => (prev.id === productId ? item : prev));

      set(cartListAtom, updated);
    },
});

export const selectedCartItemSelector = selector<CartItem['id'][]>({
  key: 'selectedCartItemSelector',
  get: ({ get }) => {
    const list = get(cartListAtom);

    return list.map((item) => item.id);
  },
  set: ({ set }, updated) => {
    set(cartSelectedItemAtom, updated);
  },
});
