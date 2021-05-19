import { BASE_URL } from '../constants';

const request = async (url, option = {}) => {
  try {
    const res = await fetch(url, option);
    const body = await res.json();

    if (!res.ok) {
      throw new Error(`http request Error : ${res.status}`);
    }

    return body;
  } catch (error) {
    throw new Error(`http request Error : ${error}`);
  }
};

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
