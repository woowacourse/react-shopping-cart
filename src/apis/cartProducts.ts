import type { CartProduct } from '../types/product';

const URL = `${process.env.PUBLIC_URL}/data/cartProducts.json`;

export const fetchCartProducts = async () => {
  const response = await fetch(URL);
  const data: CartProduct[] = await response.json();
  return data;
};
