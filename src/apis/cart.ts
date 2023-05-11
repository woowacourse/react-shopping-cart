import { CartItem } from '../types/cart';
import { client } from './index';

interface FetchCartRes {
  cart: CartItem[];
}

export const fetchCart: () => Promise<FetchCartRes> = async () => {
  const { data } = await client('/data/mockCart.json');

  return data;
};

interface AddCartDataReq {
  id: string;
  quantity: string;
}

interface AddCartDataRes {}

export const addCartData: (
  payload: AddCartDataReq
) => Promise<AddCartDataRes> = async ({ id, quantity }) => {
  const { data } = await client.post(`/cart/${id}`, { quantity });

  return data;
};
