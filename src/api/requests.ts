import { api } from 'api';

export const getProductList = async () => {
  const data = await api.get('/api/products');
  return data;
};

export const getCartList = async () => {
  const data = await api.get('/api/cart-items');
  return data;
};

export const postCartItem = async (payload: { productId: number }) => {
  const response = await api.post('/api/cart-items', payload);
  return response;
};

export const patchCartItemQuantity = async (
  cartId: number,
  payload: { quantity: number }
) => {
  const response = await api.patch(`/api/cart-items/${cartId}`, payload);
  return response;
};

export const deleteCartItem = async (cartId: number) => {
  const response = await api.delete(`/api/cart-items/${cartId}`);
  return response;
};
