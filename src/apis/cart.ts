import { AxiosError } from 'axios';
import { CartItem } from '../types/cart';
import { client } from './index';

interface FetchCartRes extends AxiosError {
  cart: CartItem[];
}

export const fetchCart: () => Promise<FetchCartRes> = async () => {
  try {
    const res = await client('/data/mockCart.json');
    return res.data;
  } catch {
    throw new Error('장바구니 목록을 불러오지 못했습니다.');
  }
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
