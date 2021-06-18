import axios from 'axios';
import { BASE_URL } from '../constants';
import { decamelizeKeys, camelizeKeys } from 'fast-case';

const CART_API_URL = `${BASE_URL}/api/customers/2sooy/carts`;

export const getCartItems = async () => {
  const response = await axios.get(CART_API_URL);

  return camelizeKeys(response.data);
};

export const addCartItem = async id => {
  const data = decamelizeKeys({ productId: id });

  const response = await axios.post(CART_API_URL, data);
  const [cartId] = response.headers.location.split('/').slice(-1);

  return Number(cartId);
};

export const deleteCartItem = async id => {
  await axios.delete(`${CART_API_URL}/${id}`);

  return id;
};

export const deleteCartItems = async ids => {
  await Promise.all(ids.map(id => axios.delete(`${CART_API_URL}/${id}`)));

  return ids;
};
