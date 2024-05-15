import { selector } from 'recoil';
import { fetchCartItems } from '../api';

export const productsState = selector({
  key: 'productsState',
  get: async () => {
    const products = await fetchCartItems();

    return products;
  },
});
