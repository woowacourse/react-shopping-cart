import axios from 'axios';
import { STATUS_CODE, URL } from '../constants';

export const requestAddProductToCart = async (product: Product) => {
  const response = await axios.post(URL.CART, { ...product, quantity: '1' });

  if (response.status !== STATUS_CODE.POST_SUCCESS) {
    throw { status: response.status };
  }

  return response;
};
