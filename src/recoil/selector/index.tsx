import { DefaultValue, selector, selectorFamily } from 'recoil';
import { fetchAPI } from 'src/api';
import { cartListAtom, cartSelectedItemAtom } from '../atom';
import { CartItem, ProductId, SelectedProducts } from 'src/types';

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
      console.log(list, 'cartList');
      const updated = list.map((prev) => (prev.id === productId ? item : prev));

      set(cartListAtom, updated);
    },
});

/**
 * 전역상태 관리를 어떠헥 해야할까?
 * 선택된 값들과 그것에서 나타나는 파생값들을 계산해야 함.
 *
 * 선택된 값들은 어떻게 보면 carttem의 selector라고 할 수 있음.
 *
 * 셀렉터의 값을 상태로 두고, 그 값들을 변환하도록 하면?
 */

export const selectedCartItemSelector = selector<SelectedProducts[]>({
  key: 'selectedCartItemSelector',
  get: ({ get }) => {
    const current = get(cartSelectedItemAtom);
    const list = get(cartListAtom);

    if (current.length) {
      return list.map((item) => {
        const prevItem = current.find((prevItem) => prevItem.id === item.id);

        return {
          id: item.id,
          price: item.quantity * item.product.price,
          checked: prevItem ? prevItem.checked : true,
        };
      });
    }

    return list.map((item) => ({
      id: item.id,
      price: item.quantity * item.product.price,
      checked: true,
    }));
  },
  set: ({ set }, newValue) => {
    set(cartSelectedItemAtom, newValue);
  },
});
