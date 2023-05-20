import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import { CartItem, ProductId } from 'src/types';

export const cartListAtom = atom<CartItem[]>({
  key: 'cartItem',
  default: JSON.parse(localStorage.getItem('cartItem') ?? '[]'),
  effects: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem('cartItem');
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem('cartItem')
          : localStorage.setItem('cartItem', JSON.stringify(newValue));
      });
    },
  ],
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

export const wholeCartITemToggleSelector = selector({
  key: 'wholeCartITemToggleSelector',
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
