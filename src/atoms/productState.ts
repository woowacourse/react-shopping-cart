import { selector, selectorFamily } from 'recoil';
import { productQuery, productsQuery } from '../api/api';

export const products = selector({
  key: 'productsSelector',
  get: async () => {
    return productsQuery();
  },
});

export const product = selectorFamily({
  key: 'productSelector',
  get: (id: number) => async () => {
    return productQuery(id);
  },
});
