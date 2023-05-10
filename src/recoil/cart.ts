import { CartItem } from './../types/cart';
import { selector } from 'recoil';
import axios, { AxiosResponse } from 'axios';

export const cartState = selector({
  key: 'cart',
  get: async (): Promise<AxiosResponse<{ cart: CartItem[] }>> => {
    const cart = await axios('/data/mockCart.json');

    return cart;
  },
});

export const cartQuantityBadgeState = selector({
  key: 'cartQuantityBadge',
  get: ({ get }) => {
    const {
      data: { cart },
    } = get(cartState);

    return cart.length;
  },
});
