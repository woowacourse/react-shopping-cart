import { selector } from 'recoil';
import type { Product } from '../../type';

const productsQuery = selector<Product[]>({
  key: 'productsQuery',
  get: async () => {
    const response = await fetch('/fixtures/products.json');
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    return response.json();
  },
});

export default productsQuery;
