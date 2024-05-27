import { requestServer } from '../requestServer';

import { CartItemsResponse, CartItemsCountsResponse, CartItem } from './types';

export const fetchCartItems = async (): Promise<CartItem[]> => {
  const data = await requestServer<CartItemsResponse>('/cart-items', 'GET');
  return data.content;
};

export const fetchCartTotalQuantity = async (): Promise<number> => {
  const data = await requestServer<CartItemsCountsResponse>('/cart-items/counts', 'GET');
  return data.quantity;
};

export const fetchChangeCartItemsQuantity = async (itemId: number, quantity: number): Promise<void> => {
  await requestServer(`/cart-items/${itemId}`, 'PATCH', { quantity });
};

export const fetchDeleteCartItem = async (itemId: number): Promise<void> => {
  await requestServer(`/cart-items/${itemId}`, 'DELETE');
};
