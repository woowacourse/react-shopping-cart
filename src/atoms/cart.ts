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

export const cartItemsAmountSelector = selector({
  key: 'cartItemsAmount',
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

export const selectedItemsSelector = selector({
  key: 'selectedItemsSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedItems = get(selectedItemsState);

    return cart.reduce<Set<CartItem['id']>>(
      (newSelectedItems, item) =>
        selectedItems.has(item.id)
          ? newSelectedItems.add(item.id)
          : newSelectedItems,
      new Set()
    );
  },
  set: ({ set }, newValue) => {
    set(selectedItemsState, newValue);
  },
});

export const selectedItemsAmountSelector = selector({
  key: 'selectedItemsAmountSelector',
  get: ({ get }) => get(selectedItemsSelector).size,
});

export const getCartItemById = selectorFamily({
  key: 'hasItemInCart',
  get:
    (id: CartItem['id']) =>
    ({ get }) => {
      return get(cartState).find((item) => item.id === id);
    },
});

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedItems = get(selectedItemsSelector);

    return cart.reduce(
      (totalPrice, { id, quantity, product: { price } }) =>
        selectedItems.has(id) ? totalPrice + quantity * price : totalPrice,
      0
    );
  },
});
