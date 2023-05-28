import { selector } from 'recoil';
import { fetchProducts } from '../../remotes/product';
import { PRODUCTS_BASE_URL } from '../../remotes/constants';
import type { Product } from '../../types/product';

export const productListQuery = selector<Product[]>({
  key: 'productList',
  get: async () => {
    const products = await fetchProducts(PRODUCTS_BASE_URL);

    return products;
  },
});
