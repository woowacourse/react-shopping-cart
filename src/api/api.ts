import axios from 'axios';
import { API_URL, PRODUCT_LIST_PAGE_LIMIT } from './constants';
const productAPI = axios.create({
  baseURL: `${API_URL}products`,
});

export const getProductList = async (page): Promise<any> => {
  const response = await productAPI.get('', {
    params: { _page: page, _limit: PRODUCT_LIST_PAGE_LIMIT },
  });

  if (response.statusText !== 'OK') {
    throw Error('서버 오류!');
  }

  return { productList: response.data, totalProductCount: response.headers['x-total-count'] };
};

const cartAPI = axios.create({
  baseURL: `${API_URL}carts`,
});

export const addCart = async (product): Promise<any> => {
  const response = await cartAPI.post('', { product });

  if (response.statusText !== 'Created') {
    throw Error('서버 오류!');
  }
};

export const getCart = async (): Promise<any> => {
  const response = await cartAPI.get('');

  if (response.statusText !== 'OK') {
    throw Error('서버 오류!');
  }

  return { cartList: response.data };
};
