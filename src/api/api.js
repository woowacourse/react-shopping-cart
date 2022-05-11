import axios from 'axios';
import { API_URL, PRODUCT_LIST_PAGE_LIMIT } from './constants';

const productAPI = axios.create({
  baseURL: API_URL,
});

export const getProductList = async page => {
  const response = await productAPI.get(
    `/products?_page=${page}&_limit=${PRODUCT_LIST_PAGE_LIMIT}`,
  );

  if (response.statusText !== 'OK') {
    throw Error('서버 오류!');
  }

  return { productList: response.data, totalProductCount: response.headers['x-total-count'] };
};
