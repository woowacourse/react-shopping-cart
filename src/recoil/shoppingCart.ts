import { fetchCartItems } from '@apis/shoppingCart';
import { CartItem } from '@appTypes/shoppingCart';
import { atom, selector } from 'recoil';

export const cartItemsAtom = atom<CartItem[]>({
  key: 'cartItemsAtom',
  default: [],
});

export const cartItemsSelector = selector<CartItem[]>({
  key: 'cartItemsSelector',
  get: async ({ get }) => {
    const prevCartItems = get(cartItemsAtom);

    if (prevCartItems.length > 0) return prevCartItems;

    const cartItems = await fetchCartItems();

    return cartItems;
  },

  set: ({ set }, newValue) => {
    set(cartItemsAtom, newValue);
  },
});

export const totalOrderState = selector({
  key: 'totalOrderState',
  get: ({ get }) => {
    const cartItems = get(cartItemsSelector);

    return cartItems.reduce((acc, cur) => acc + cur.product.price, 0);
  },
});
