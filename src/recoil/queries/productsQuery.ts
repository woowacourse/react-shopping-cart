import { selector } from 'recoil';
import client from '../../api';
import type { Product } from '../../type';

const productsQuery = selector<Product[]>({
  key: 'productsQuery',
  get: async () => {
    const data = await client.get('/products');
    return data;
  },
});

export default productsQuery;
