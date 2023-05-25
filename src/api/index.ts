import type { CartType, ProductType } from '../types';

import { MOCK_URL } from '../constants';

const BASE_URL = MOCK_URL;

const get =
  <T>(path: string) =>
  async () => {
    const response = await fetch(`${BASE_URL}/${path}`);
    if (!response.ok) throw new Error(`${path} GET error`);

    const data: T = await response.json();

    return data;
  };

export const getProducts = get<ProductType[]>('products');

export const getCart = get<CartType>('cart-items');

export const postCartItem = async (productId: number) => {
  const url = `${BASE_URL}/cart-items`;
  const body = { productId };

  const response = await fetch(url, { method: 'POST', body: JSON.stringify(body) });
  if (!response.ok) throw new Error(`${url} POST Error`);
};

export const patchCartItemQuantity = async (cartItemId: number, quantity: number) => {
  const url = `${BASE_URL}/cart-items/${cartItemId}`;
  const body = { quantity };

  const response = await fetch(url, { method: 'PATCH', body: JSON.stringify(body) });
  if (!response.ok) throw new Error(`${url} PATCH Error`);
};

export const deleteCartItem = async (cartItemId: number) => {
  const url = `${BASE_URL}/cart-items/${cartItemId}`;

  const response = await fetch(url, { method: 'DELETE' });
  if (!response.ok) throw new Error(`${url} FETCH Error`);
};
