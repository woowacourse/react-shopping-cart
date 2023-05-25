import { selector, selectorFamily } from 'recoil';
import { productQuery, productsQuery } from '../api/api';

export const products = selector({
  key: 'productsSelector',
  get: async () => {
    const response = productsQuery();
    return response;
  },
});

export const product = selectorFamily({
  key: 'productSelector',
  get: (id: number) => async () => {
    const response = productQuery(id);
    return response;
  },
});
