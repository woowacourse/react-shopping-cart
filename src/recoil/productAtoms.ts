import { selector } from 'recoil';
import type { ProductItem } from '../types/types';

export const fetchProductList = selector<ProductItem[]>({
  key: 'fetchProductList',
  get: async () => {
    const response = await fetch('/products');
    const data = await response.json();
    return data;
  },
});
