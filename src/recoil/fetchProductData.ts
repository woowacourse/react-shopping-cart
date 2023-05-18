import { selector } from 'recoil';
import { Product } from '../types/product';

const URL = `/products`;

export const fetchProductsSelector = selector<Product[]>({
  key: 'fetchProducts',
  get: async () => {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    const data: Product[] = await response.json();
    return data;
  },
});
