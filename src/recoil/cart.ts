import { selector, atom, selectorFamily } from 'recoil';
import axios from 'axios';
import { CartItem } from '../types/cart';

export const cartState = atom({
  key: 'cart',
  default: selector({
    key: 'getMockCart',
    get: async (): Promise<CartItem[]> => {
      const { data } = await axios<{ cart: CartItem[] }>('/data/mockCart.json');

      return data.cart;
    },
  }),
});

export const hasItemInCart = selectorFamily({
  key: 'hasItemInCart',
  get:
    (id: CartItem['id']) =>
    ({ get }) => {
      return get(cartState).find((item) => item.id === id);
    },
});
