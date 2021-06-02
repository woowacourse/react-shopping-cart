import { BASE_URL } from '../constants';
import { store } from '../store/';
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
    return await (await request(`${BASE_URL}/api/products`)).json();
  },
  addItemToCart: async id => {
    const data = {
      product_id: id,
    };
    const dataJson = JSON.stringify(data);

    return await request(`${BASE_URL}/api/customers/${store.getState().userReducer.name}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataJson,
    });
  },
  getCartItemList: async () => {
    return await (
      await request(`${BASE_URL}/api/customers/${store.getState().userReducer.name}/carts`)
    ).json();
  },
  deleteCartItem: async ({ id }) => {
    return await request(
      `${BASE_URL}/api/customers/${store.getState().userReducer.name}/carts/${id}`,
      {
        method: 'DELETE',
      },
    );
  },
  purchase: async data => {
    return await request(`${BASE_URL}/api/customers/${store.getState().userReducer.name}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: [],
    });
  },
};

export default API;

// const fetchInfo = {
//   getItemList: {
//     URL: '/api/products',
//   },
//   addItemToCart: {
//     URL: userName => `/api/customers/${userName}/carts`,
//     fetchConfig: {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     },
//   },
//   getCartItemList: {
//     URL: userName => `/api/customers/${userName}/carts`,
//   },
//   deleteCartItem: {
//     URL: (userName, cart_id) => `/api/customers/${userName}/carts/${cart_id}`,
//     fetchConfig: {
//       method: 'DELETE',
//     },
//   },
//   purchase: {
//     URL: userName => `/api/customers/${userName}/orders`,
//     fetchConfig: {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: [],
//     },
//   },
// };

// const API = {
//   GetItemList: () => {
//     return useFetch('/api/products');
//   },
//   GetCartItem: userName => {
//     return useFetch(`/api/customers/${userName}/carts`);
//   },
// };
