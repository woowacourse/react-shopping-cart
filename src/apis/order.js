import axios from 'axios';
import { BASE_URL } from '../constants';
import { decamelizeKeys, camelizeKeys } from 'fast-case';

const ORDER_API_URL = `${BASE_URL}/api/customers/2sooy/orders`;

export const addOrder = async order => {
  const data = decamelizeKeys(order);

  const response = await axios.post(ORDER_API_URL, data);
  const [orderId] = response.headers.location.split('/').slice(-1);

  return Number(orderId);
};

export const getOrders = async () => {
  const response = await axios.get(ORDER_API_URL);

  return camelizeKeys(response.data);
};

export const getOrder = async id => {
  const response = await axios.get(`ORDER_API_URL/${id}`);

  return response.data;
};
