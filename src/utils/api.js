import { BASE_URL } from '../constants';

const USER = 'sunhpark42';

const request = async (url, option = {}) => {
  try {
    const res = await fetch(url, option);

    if (!res.ok) {
      throw new Error(`http request Error : ${res.status}`);
    }

    return res;
  } catch (error) {
    throw new Error(`http request Error : ${error}`);
  }
};

const API = {
  getItemList: async () => {
    return await request(`${BASE_URL}/api/products`);
  },
  addItemToCart: async id => {
    const data = {
      product_id: id,
    };
    const dataJson = JSON.stringify(data);
    console.log(dataJson);

    return await request(`${BASE_URL}/api/customers/${USER}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataJson,
    });
  },
  getCartItemList: async () => {
    return await request(`${BASE_URL}/api/customers/${USER}/carts`);
  },
  deleteCartItem: async ({ id }) => {
    return await request(`${BASE_URL}/api/customers/${USER}/carts/${id}`, {
      method: 'DELETE',
    });
  },
  purchase: async data => {
    return await request(`${BASE_URL}/api/customers/${USER}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: [],
    });
  },
};

export default API;
