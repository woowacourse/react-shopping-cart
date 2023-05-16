import { Product } from './../types/product';
import { selector } from 'recoil';
import mockData from '../data/mockProducts.json';

export const fetchProductSelector = selector({
  key: 'FetchProductSelector',
  get: async () => {
    const products = mockData as Product[];

    return products;
  },
});
