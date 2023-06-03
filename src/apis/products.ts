import { Product } from '../types/products';
import { getData } from '.';

export const fetchProductData = async (): Promise<Product[]> => {
  const data = await getData<Product[]>('/products');

  return data;
};
