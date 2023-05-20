import { selector } from 'recoil';
import mockServerClient from '../../api';
import type { Product } from '../../type';

const productsQuery = selector<Product[]>({
  key: 'productsQuery',
  get: async () => {
    const data = await mockServerClient.get('/products');
    return data;
  },
});

export default productsQuery;
