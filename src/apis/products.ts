import type { Product } from '../types/product';

const URL = '/products/empty';

export const fetchProducts = async () => {
  const response = await fetch(URL);
  const data: Product[] = await response.json();
  return data;
};
