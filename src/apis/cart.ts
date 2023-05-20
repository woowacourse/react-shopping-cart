import { CartItem } from '../types/cart';
import { waitFor, WaitForOptions } from '../utils/waitFor';
import { fetchQuery } from './api';

interface FetchCartRes {
  cart: CartItem[];
}

export const fetchCart = (options?: WaitForOptions<FetchCartRes>) => {
  const promise = fetchQuery.get<FetchCartRes>(`/cart`);

  return waitFor(promise, options);
};

interface AddCartDataReq {
  id: number;
  quantity: number;
}

interface AddCartDataRes {}

export const addToCart: (
  payload: AddCartDataReq
) => Promise<AddCartDataRes> = ({ id, quantity }) => {
  return fetchQuery.post<AddCartDataRes>(`/cart/${id}`, {
    body: { id, quantity },
  });
};
