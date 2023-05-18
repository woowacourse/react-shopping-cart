import { CartItem } from '../types/cart';
import { fetcher } from '.';

export const fetchCart: () => Promise<CartItem[]> = async () => {
  const data = await fetcher<CartItem[]>('/cart-items');
  return data;
};
