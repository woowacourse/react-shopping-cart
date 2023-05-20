import { selector } from 'recoil';
import { fetchProducts } from '../apis/products';
import type { Product } from '../types/product';

export const fetchProductsSelector = selector<Product[]>({
  key: 'fetchProducts',
  get: async () => {
    const response = await fetchProducts();
    return response;
  },
});
