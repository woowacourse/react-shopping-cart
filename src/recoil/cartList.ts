import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from 'recoil';
import { CartItem, ProductId } from 'src/types';

export const cartListAtom = atom<CartItem[]>({
  key: 'cartItem',
  default: [],
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

    return list.filter((data) => data.isSelected).length;
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
