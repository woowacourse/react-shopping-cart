import { Product } from '../types/products';
import { client } from './index';

interface fetchProductDataRes {
  items: Product[];
}

export const fetchProductData = async (): Promise<fetchProductDataRes> => {
  const { data } = await client('/data/mockProducts.json');

  return data;
};
