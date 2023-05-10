import { selector, atom } from 'recoil';
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
