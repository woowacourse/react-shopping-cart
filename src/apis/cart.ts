import { CartItem } from '../types/cart';
import { deleteData, getData, patchData, postData } from '.';

export const fetchCartItems: () => Promise<CartItem[]> = async () => {
  const data = await getData<CartItem[]>('/cart-items');
  return data;
};

export const addCartItem: (data: CartItem) => Promise<void> = async (data) => {
  await postData('/cart-items', data);
};

export const modifyCartItem: <T>(
  id: CartItem['id'],
  data: T
) => Promise<void> = async (id, data) => {
  await patchData(`/cart-items/${id}`, data);
};

export const deleteCartItem: (id: CartItem['id']) => Promise<void> = async (
  id
) => {
  await deleteData(`/cart-items/${id}`);
};
