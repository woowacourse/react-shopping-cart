import type { Product } from '../types/product';
import { getData } from './utils';

const productApis = {
  baseUrl: '/products',

  get() {
    return getData<Product[]>(productApis.baseUrl);
  },
};

export default productApis;
