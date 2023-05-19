import { API_ENDPOINT } from '../constants/api';
import { ProductItemData } from '../types';
import { fetchAPI } from './fetchAPI';

const getProductList = async (): Promise<ProductItemData[]> => {
  return await fetchAPI(API_ENDPOINT.PRODUCTS_GET);
};

export { getProductList };
