import { API_PATH } from 'constants/path';
import apiClient from 'utils/apiClient';

export const getCartListFromApi = () => apiClient.get(API_PATH.CART_LIST);

export const getOrderListFromApi = () => apiClient.get(API_PATH.ORDER_LIST);

export const getProductFromApi = (id) =>
  apiClient.get(`${API_PATH.PRODUCT_LIST}/${id}`);

export const getProductListFromApi = () => apiClient.get(API_PATH.PRODUCT_LIST);
