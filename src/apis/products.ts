import type { Product } from '../types/product';
import { handleResponseError } from './utils';

const productApis = {
  baseUrl: '/products',

  async get() {
    const response = await fetch(productApis.baseUrl);

    await handleResponseError(response);

    const data: Product[] = await response.json();
    return data;
  },
};

export default productApis;
