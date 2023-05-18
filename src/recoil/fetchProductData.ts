import { selector } from 'recoil';
import { Product } from '../types/product';
import { fetchProducts } from '../apis/products';

export const fetchProductsSelector = selector<Product[]>({
  key: 'fetchProducts',
  get: async () => {
    const response = await fetchProducts();
    return response;
  },
});
