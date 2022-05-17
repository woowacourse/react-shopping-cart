import axios from 'axios';
import { API_URL, PRODUCT_LIST_PAGE_LIMIT } from './constants';

const productAPI = axios.create({
  baseURL: API_URL,
});

const checkServerError = (statusText) => {
  if (statusText !== 'OK') {
    throw Error('서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

export const getProductList = async (page) => {
  const pageQuery = `_page=${page}&_limit=${PRODUCT_LIST_PAGE_LIMIT}`;

  const response = await productAPI.get(`/products?${pageQuery}`);
  checkServerError(response.statusText);

  const productList = response.data;
  const totalProductCount = response.headers['x-total-count'];

  return { productList, totalProductCount };
};

export const addToCart = async (productId, quantity) => {
  const response = await productAPI.post('/shopping-cart', { productId, quantity });
  checkServerError(response.statusText);

  const cart = response.data;

  return { cart };
};

export const getCart = async () => {
  const response = await productAPI.get(`/shopping-cart`);
  checkServerError(response.statusText);

  const cart = response.data;

  return { cart };
};

export const updateCartProductQuantity = async (productId, quantity) => {
  const response = await productAPI.patch(`/shopping-cart`, { productId, quantity });
  checkServerError(response.statusText);

  const cart = response.data;

  return { cart };
};

const sendCartProductDeleteRequest = async (res, productId, index, array) => {
  res = await productAPI.delete(`/shopping-cart/${productId}`);
  checkServerError(res.statusText);

  if (index === array.length - 1) return res;
};

export const deleteCartProduct = async (productIdArray) => {
  const response = await productIdArray.reduce(sendCartProductDeleteRequest, null);
  const cart = response.data;

  return { cart };
};
