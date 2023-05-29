import type { CartProduct } from '../types/product';
import { getData, mutateData } from './utils';

const cartProductApis = {
  baseUrl: '/cart-items',

  get() {
    return getData<CartProduct[]>(cartProductApis.baseUrl);
  },

  post(id: number) {
    return mutateData({
      url: cartProductApis.baseUrl,
      method: 'POST',
      body: { productId: id },
    });
  },

  patch(id: number, quantity: number) {
    return mutateData({
      url: cartProductApis.baseUrl,
      method: 'PATCH',
      param: id,
      body: { quantity },
    });
  },

  delete(id: number) {
    return mutateData({
      url: cartProductApis.baseUrl,
      method: 'DELETE',
      param: id,
    });
  },
};

export default cartProductApis;
