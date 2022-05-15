import axios from 'axios';
import { API_URL, PRODUCT_LIST_PAGE_LIMIT } from './constants';

const productAPI = axios.create({
  baseURL: API_URL,
});

export const getProductList = async (page) => {
  const response = await productAPI.get(
    `/products?_page=${page}&_limit=${PRODUCT_LIST_PAGE_LIMIT}`,
  );

  if (response.statusText !== 'OK') {
    throw Error('서버 오류!');
  }

  return { productList: response.data, totalProductCount: response.headers['x-total-count'] };
};

export const addToCart = async (productId, quantity) => {
  const response = await productAPI.post('/shopping-cart', { productId, quantity });

  if (response.statusText !== 'OK') {
    throw Error('서버 오류');
  }

  return response.data;
};

export const getCart = async () => {
  const response = await productAPI.get(`/shopping-cart`);

  if (response.statusText !== 'OK') {
    throw Error('서버 오류!');
  }

  return { cart: response.data };
};
