import { ProductItemData } from '../types';
import { fetchAPI } from './fetchAPI';

const getProductList = async (): Promise<ProductItemData[]> => {
  return await fetchAPI('/api/products');
};

export { getProductList };
