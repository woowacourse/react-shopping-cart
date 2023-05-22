import { DefaultValue, selector, selectorFamily } from 'recoil';
import { fetchAPI } from 'src/api';
import { cartListAtom } from '../atom';
import { ProductId } from 'src/types';

export const cartListSelector = selector({
  key: 'cartItemSelector',
  get: async () => {
    const cartItems = await fetchAPI('/api/cart-items');
    console.log(cartItems, '@@');
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

export const countSelectedCartItemsSelector = selector({
  key: 'countSelectedCartItemsSelector',
  get: ({ get }) => {
    const list = get(cartListAtom);

    return list.filter((data) => data.isSelected);
  },
});

export const quantityTimesNumber = selectorFamily<number, ProductId>({
  key: 'quantityTimesNumber',
  get:
    (productId) =>
    ({ get }) => {
      const list = get(cartListAtom);

      const currentItem = list.find(({ id }) => id === productId);
      if (!currentItem) return 0;

      return currentItem.product.price * currentItem.quantity;
    },
});

export const selectedCartItemTotal = selector({
  key: 'selectedCartItemTotal',
  get: ({ get }) => {
    const list = get(cartListAtom);

    const selectedItems = list.filter(({ isSelected }) => isSelected);

    return selectedItems.reduce((acc, cur) => {
      if (cur.isSelected) {
        const curTotalPrice = get(quantityTimesNumber(cur.id));
        return acc + curTotalPrice;
      }

      return acc;
    }, 0);
  },
});

export const wholeCartItemToggleSelector = selector({
  key: 'wholeCartItemToggleSelector',
  get: ({ get }) => {
    const selectedList = get(countSelectedCartItemsSelector);
    if (selectedList.length === 0) return false;

    return get(countCartListSelector) === selectedList.length;
  },
  set: ({ get, set }, select) => {
    if (select instanceof DefaultValue) return;
    const selectedList = get(cartListAtom).map((item) => ({
      ...item,
      isSelected: select,
    }));

    set(cartListAtom, selectedList);
  },
});

export const deleteCartItemSelector = selector({
  key: 'deleteCartItemSelector',
  get: ({ get }) => {
    return get(cartListAtom)
      .filter((item) => !item.isSelected)
      .map((item) => item.id);
  },
  set: ({ get, set }, productIds) => {
    if (productIds instanceof DefaultValue) return;
    const cartList = get(cartListAtom);
    const updateList = cartList.filter(({ id }) => !productIds.includes(id));

    set(cartListAtom, updateList);
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
        set(deleteCartItemSelector, [productId]);
        return;
      }

      const updated = list.map((prev) => (prev.id === productId ? item : prev));

      set(cartListAtom, updated);
    },
});
