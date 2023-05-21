import { CartItem } from '../types/cart';
import { waitFor, WaitForOptions } from '../utils/waitFor';
import { fetchQuery } from './api';

export interface FetchCartRes {
  cart: CartItem[];
}

export const fetchCart = (options?: WaitForOptions<FetchCartRes>) => {
  const promise = fetchQuery.get<FetchCartRes>(`/cart`);

  return waitFor(promise, options);
};

export interface AddCartDataReq {
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

export interface UpdateCartItemReq {
  id: number;
  quantity: number;
}

interface UpdateCartItemRes {}

export const updateCartItem: (
  payload: UpdateCartItemReq
) => Promise<UpdateCartItemRes> = ({ id, quantity }) => {
  return fetchQuery.patch<UpdateCartItemRes>(`/cart/${id}`, {
    body: { quantity },
  });
};

interface DeleteCartItemRes {}

export const deleteCartItem: (
  idList: Array<CartItem['id']>
) => Promise<DeleteCartItemRes> = (idList) => {
  return fetchQuery.delete<DeleteCartItemRes>(`/cart`, {
    body: idList,
  });
};
