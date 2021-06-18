import axios from 'axios';
import { BASE_URL } from '../constants';
import { camelizeKeys } from 'fast-case';

const PRODUCT_API_URL = `${BASE_URL}/api/products`;

export const getProducts = async () => {
  const response = await axios.get(PRODUCT_API_URL);

  return camelizeKeys(response.data);
};

export const getProduct = async id => {
  const response = await axios.get(`${PRODUCT_API_URL}/${id}`);

  return camelizeKeys(response.data);
};
