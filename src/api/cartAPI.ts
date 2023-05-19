import { API_ENDPOINT } from '../constants/api';
import { CartItemData } from '../types';
import { fetchAPI } from './fetchAPI';

const getCartList = async (): Promise<CartItemData[]> => {
  return await fetchAPI(API_ENDPOINT.CART_GET);
};

const postCartItem = async (productId: number, quantity: number): Promise<CartItemData[]> => {
  const data = {
    quantity,
    productId,
  };
  const jsonData = JSON.stringify(data);

  return await fetchAPI(API_ENDPOINT.CART_POST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonData,
  });
};

const patchCartItem = async (productId: number, quantity: number): Promise<CartItemData[]> => {
  const data = {
    quantity,
  };
  const jsonData = JSON.stringify(data);

  return await fetchAPI(`${API_ENDPOINT.CART_PATCH}/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonData,
  });
};

const deleteCartItem = async (productId: number): Promise<Response> => {
  return await fetchAPI(`${API_ENDPOINT.CART_DELETE}/${productId}`, {
    method: 'DELETE',
  });
};

export { getCartList, postCartItem, patchCartItem, deleteCartItem };
