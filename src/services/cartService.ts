import { apiClient } from './apiClient';

export const getCart = async () => {
  const data = await apiClient({
    method: 'GET',
    path: '/cart-items',
  });

  return data.content;
};

export const modifyCartItem = async (cartItemId: number, quantity: number) => {
  const data = await apiClient({
    method: 'PATCH',
    path: `/cart-items/${cartItemId}`,
    body: { quantity: quantity },
  });

  return data;
};

export const deleteCartItem = async (cartItemId: number) => {
  const data = await apiClient({
    method: 'DELETE',
    path: `/cart-items/${cartItemId}`,
  });

  return data;
};
