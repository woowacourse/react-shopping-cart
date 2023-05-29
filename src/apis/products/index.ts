import { get } from 'apis';
import { Product } from 'types/product';

const URL = '/products';

export const getProducts = async (): Promise<Product[]> => {
  const data = await get<Product[]>(URL);
  const products = data.data;

  return products;
};
