import { Product } from '../types/products';
import { fetcher } from '.';

interface fetchProductDataRes {
  items: Product[];
}

export const fetchProductData = async (): Promise<fetchProductDataRes> => {
  const data = await fetcher<fetchProductDataRes>('/products');
  return data;
};
