import { requestServer } from '../requestServer';

import { CartItemsResponse, CartItemsCountsResponse, CartItem } from './types';

export async function fetchCartItems(): Promise<CartItem[]> {
  const data = await requestServer<CartItemsResponse>('/cart-items', 'GET');
  return data.content;
}

export async function fetchCartTotalQuantity(): Promise<number> {
  const data = await requestServer<CartItemsCountsResponse>('/cart-items/counts', 'GET');
  return data.quantity;
}

export async function fetchPatchCartItemsQuantity(itemId: number, quantity: number): Promise<void> {
  await requestServer(`/cart-items/${itemId}`, 'PATCH', { quantity });
}

export async function fetchDeleteCartItem(itemId: number): Promise<void> {
  await requestServer(`/cart-items/${itemId}`, 'DELETE');
}
