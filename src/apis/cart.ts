import { CartItem } from '../types/cart';
import { fetcher } from '.';

interface FetchCartRes {
  cart: CartItem[];
}

export const fetchCart: () => Promise<FetchCartRes> = async () => {
  const data = await fetcher<FetchCartRes>('./data/mockCart.json');
  return data;
};
