import axios from 'axios';

import { SERVER_URL } from 'constants';

export const getProductList = async () => {
  try {
    const response = await axios.get(SERVER_URL + 'products');
    return response.data;
  } catch (error) {
    alert(error);
  }
};
