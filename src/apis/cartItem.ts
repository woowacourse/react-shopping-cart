import fetcher from './fetcher';

import { REQUEST_URL } from '@/constants/url';
import { CartItemProps } from '@/types/cartItem';

interface FetchResponse {
  type: 'PATCH' | 'DELETE' | 'POST';
  status: number;
}

export const fetchCartItems = async (): Promise<CartItemProps[]> => {
  const res = await fetcher.get({ requestUrl: REQUEST_URL.cartItems });
  const result = await res.json();

  return result.content;
};

export const updateItemQuantity = async (
  cartId: number,
  quantity: number,
): Promise<FetchResponse> => {
  const res = await fetcher.patch({
    requestUrl: REQUEST_URL.updateItemQuantity(cartId),
    body: { quantity },
  });

  return { type: 'PATCH', status: res.status };
};

export const deleteItem = async (cartId: number): Promise<FetchResponse> => {
  const res = await fetcher.delete({
    requestUrl: REQUEST_URL.deleteItem(cartId),
  });

  return { type: 'DELETE', status: res.status };
};

export const addItem = async (productId: number): Promise<FetchResponse> => {
  const res = await fetcher.post({ requestUrl: REQUEST_URL.cartItems, body: { productId } });

  return { type: 'POST', status: res.status };
};
