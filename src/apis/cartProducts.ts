import type { CartProduct } from '../types/product';
import { handleResponseError } from './utils';

const cartProductApis = {
  baseUrl: '/cart-items',

  getUrl(param?: string) {
    return param
      ? `${cartProductApis.baseUrl}/${param}`
      : cartProductApis.baseUrl;
  },

  async get() {
    const response = await fetch(cartProductApis.getUrl());

    await handleResponseError(response);

    const data: CartProduct[] = await response.json();
    return data;
  },

  async post(id: number) {
    const response = await fetch(cartProductApis.getUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: id }),
    });

    await handleResponseError(response);

    const data = await response.json();
    return data;
  },

  async patch(id: number, quantity: number) {
    const response = await fetch(cartProductApis.getUrl(id.toString()), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });

    await handleResponseError(response);

    const data = await response.json();
    return data;
  },

  async delete(id: number) {
    await fetch(cartProductApis.getUrl(id.toString()), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};

export default cartProductApis;
