import fetchClient from './fetchClient';

import { REQUEST_URL } from '@/constants/url';

export const fetchCartItems = async () => {
  const res = await fetchClient.get({ requestUrl: REQUEST_URL.cartItems });
  const result = await res.json();

  return result.content;
};

export const updateItemQuantity = async (cartId: number, quantity: number) => {
  const res = await fetchClient.patch({
    requestUrl: REQUEST_URL.updateItemQuantity(cartId),
    body: { quantity },
  });

  return { type: 'UPDATE', status: res.status };
};

export const deleteItem = async (cartId: number) => {
  const res = await fetchClient.delete({
    requestUrl: REQUEST_URL.deleteItem(cartId),
  });

  return { type: 'DELETE', status: res.status };
};
