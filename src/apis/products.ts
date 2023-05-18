import { Product } from '../types/products';
import { fetcher } from '.';

export const fetchProductData = async (): Promise<Product[]> => {
  const data = await fetcher<Product[]>('/products');

  return data;
};
