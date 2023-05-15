import { selector } from 'recoil';
import type { ProductItem } from '../types/types';
import mockData from '../assets/mockData.json'

export const fetchProductList = selector<ProductItem[]>({
  key: 'fetchProductList',
  get: async () => {
    // const response = await fetch('/products');
    // const data = await response.json();
    // return data;
    return mockData;
  },
});
