import { API_URL } from '../constants/api';
import { ProductType } from '../types';

export const getProducts = async () => {
  const response = await fetch(API_URL.PRODUCT, {
    headers: {
      Accept: 'application / json',
    },
    method: 'GET',
  });
  const data = await response.json();

  return data;
};
