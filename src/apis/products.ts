import { Product } from '../types/products';
import { fetchQuery } from './api';

interface FetchProductDataRes {
  items: Product[];
}

export const fetchProductData = async (): Promise<FetchProductDataRes> => {
  const data = await fetchQuery.get<FetchProductDataRes>('/products');

  return data;
};
