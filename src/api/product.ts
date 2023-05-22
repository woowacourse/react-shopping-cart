import { API_URL } from '../constants/api';

export const product = {
  getProducts: async () => {
    try {
      const response = await fetch(API_URL.PRODUCT, {
        headers: {
          Accept: 'application / json',
        },
        method: 'GET',
      });
      const data = await response.json();

      return data;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  },
};
