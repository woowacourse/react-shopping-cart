import fetcher from 'apis';
import { Product } from 'types/product';

const GET_URL = '/products';

export const getProducts = async (): Promise<Product[]> => {
  const products = await fetcher<Product[]>(GET_URL);

  return products as Product[];
};
