import { request } from '../utils';
import { BASE_URL } from '../constants';

const API = {
  getItemList: async () => {
    return await request(`${BASE_URL}/products`);
  },
  addItemToCart: async data => {
    return await request(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
  getCartItemList: async () => {
    return await request(`${BASE_URL}/cart`);
  },
  deleteCartItem: async data => {
    return await request(`${BASE_URL}/cart/${data.id}`, {
      method: 'DELETE',
    });
  },
  purchase: async data => {
    return await request(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};

export default API;
