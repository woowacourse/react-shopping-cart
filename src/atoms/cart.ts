import { selector, atom, selectorFamily, atomFamily } from 'recoil';
import { CartItem } from '../types/cart';
import { fetchCart } from '../apis/cart';

export const cartState = atom({
  key: 'cart',
  default: selector({
    key: 'getMockCart',
    get: async () => {
      const { cart } = await fetchCart();

      return cart;
    },
  }),
});

export const cartBadge = selector({
  key: 'cartBadge',
  get: ({ get }) => {
    return get(cartState).length;
  },
});

export const selectedItemsState = atom({
  key: 'selectedItemsState ',
  default: selector({
    key: 'selectedItemsStateSelector',
    get: ({ get }) => {
      const cart = get(cartState);

      return cart.reduce<Set<CartItem['id']>>(
        (selectedItems, item) => selectedItems.add(item.id),
        new Set()
      );
    },
  }),
});

export const selectedItemsAmountSelector = selector({
  key: 'selectedItemsAmountSelector',
  get: ({ get }) => get(selectedItemsState).size,
});

export const getCartItemById = selectorFamily({
  key: 'hasItemInCart',
  get:
    (id: CartItem['id']) =>
    ({ get }) => {
      return get(cartState).find((item) => item.id === id);
    },
});
