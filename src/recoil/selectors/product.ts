import { selector } from 'recoil';
import { PRODUCTS_BASE_URL } from '../../constants/api';
import type { Product } from '../../types/product';

export const productListQuery = selector<Product[]>({
  key: 'productList',
  get: async () => {
    const response = await fetch(PRODUCTS_BASE_URL);

    if (!response.ok) {
      throw new Error('상품 목록을 불러올 수 없습니다.');
    }

    const products = await response.json();

    return products;
  },
});
