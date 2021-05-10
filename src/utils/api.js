import { BASE_URL } from '../constants';

const request = async (url, option = {}) => {
  const res = await fetch(url, option);
  const body = await res.json();

  if (!res.ok) {
    throw new Error(`http request Error : ${res.status}${body.error.message}`);
  }

  return body;
};

const API = {
  getItemList: async () => {
    return await request(`${BASE_URL}/itemList.json`);
  },
  addItemToCart: async data => {
    return await request(`${BASE_URL}/addCart/${data.id}.json`, { method: 'GET', data });
  },
  getCartItemList: async () => {
    return await request(`${BASE_URL}/cartItemList.json`);
  },
};

export default API;
