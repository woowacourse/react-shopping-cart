import { selector, selectorFamily } from 'recoil';
import { productQuery, productsQuery } from '../api/api';

export const products = selector({
  key: 'products',
  get: async () => {
    const response = productsQuery();
    return response;
  },
});

export const product = selectorFamily({
  key: 'product',
  get: (id: number) => async () => {
    const response = productQuery(id);
    return response;
  },
});
