import { selector } from 'recoil';
import { productsQuery } from '../api/api';

export const products = selector({
  key: 'products',
  get: async () => {
    const response = productsQuery();
    return response;
  },
});
