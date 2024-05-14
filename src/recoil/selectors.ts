import { selector } from 'recoil';
import { CartItem } from '../types';
import { fetchCartItems } from '../api';

export const cartListState = selector<CartItem[]>({
  key: 'cartListState',
  get: async () => {
    const items = await fetchCartItems();
    return items;
  },
});

