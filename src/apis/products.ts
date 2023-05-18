import type { Product } from '../types/product';

const URL = `/products`;

export const fetchProducts = async () => {
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  const data: Product[] = await response.json();
  return data;
};
