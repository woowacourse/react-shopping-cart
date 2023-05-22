import { API_URL } from '../constants/api';

export const product = {
  getProducts: async () => {
    const response = await fetch(API_URL.PRODUCT, {
      headers: {
        Accept: 'application / json',
      },
      method: 'GET',
    });
    const data = await response.json();

    return data;
  },
};
