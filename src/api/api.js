import axios from 'axios';
import { ERROR_MESSAGES } from 'constants/messages';
import { API_ENDPOINT, API_URL, PRODUCT_LIST_PAGE_LIMIT } from './constants';

const apiInstance = axios.create({
  baseURL: API_URL,
});

const handleAPIError = (error) => {
  const { status } = error.response;
  if (status >= 500) {
    throw Error(ERROR_MESSAGES.SERVER_ERROR);
  }
  if (status >= 400) {
    throw Error(ERROR_MESSAGES.INVALID_REQUEST);
  }
  throw Error(ERROR_MESSAGES.UNKNOWN);
};

apiInstance.interceptors.response.use((response) => response, handleAPIError);

export const getProductList = async (page) => {
  const pageQuery = `?_page=${page}&_limit=${PRODUCT_LIST_PAGE_LIMIT}`;

  const response = await apiInstance.get(`${API_ENDPOINT.PRODUCTS}${pageQuery}`);

  const productList = response.data;
  const totalProductCount = response.headers['x-total-count'];

  return { productList, totalProductCount };
};

export const addToCart = async (productId, quantity) => {
  const response = await apiInstance.post(API_ENDPOINT.SHOPPING_CART, {
    productId,
    quantity,
  });

  const cart = response.data;

  return { cart };
};

export const getCart = async () => {
  const response = await apiInstance.get(API_ENDPOINT.SHOPPING_CART);

  const cart = response.data;

  return { cart };
};

export const updateCartProductQuantity = async (productId, quantity) => {
  const response = await apiInstance.patch(API_ENDPOINT.SHOPPING_CART, {
    productId,
    quantity,
  });

  const cart = response.data;

  return { cart };
};

export const deleteCartProduct = async (productIdArray) => {
  const response = await productIdArray.reduce(sendCartProductDeleteRequest, null);
  const cart = response.data;

  return { cart };
};

const sendCartProductDeleteRequest = async (res, productId) => {
  res = await apiInstance.delete(`${API_ENDPOINT.SHOPPING_CART}/${productId}`);

  return res;
};
