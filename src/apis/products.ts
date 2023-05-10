import type { Product } from '../types/product';

const URL = `${process.env.PUBLIC_URL}/data/products.json`;

export const fetchProducts = async () => {
  const response = await fetch(URL);
  const data: Product[] = await response.json();
  return data;
};
