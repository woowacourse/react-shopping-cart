import { CartItem } from '../types/cart';
import { deleteData, getData, patchData, postData } from '.';

export const fetchCartItems: () => Promise<CartItem[]> = async () => {
  const data = await getData<CartItem[]>('/cart-items');
  return data;
};

export const addCartItem: (data: CartItem) => void = async (data) => {
  postData('/cart-items', data);
};

export const modifyCartItem: <T>(id: CartItem['id'], data: T) => void = (
  id,
  data
) => {
  patchData(`/cart-items/${id}`, data);
};

export const deleteCartItem = (id: CartItem['id']) => {
  deleteData(`/cart-items/${id}`);
};
