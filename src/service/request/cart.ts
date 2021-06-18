import APIClient from '../../API';
import { CartId, CartItem, CartItemOnServer, ProductId } from '../../types';

export const requestCartItemList = (userName: string) =>
  APIClient.get(`/customers/${userName}/carts`) as Promise<CartItemOnServer[]>;

export const requestAddCartItem = (userName: string, productId: ProductId) =>
  APIClient.post(`/customers/${userName}/carts`, { productId });

export const requestDeleteCartItem = (userName: string, cartId: CartId) =>
  APIClient.delete(`/customers/${userName}/carts/${cartId.toString()}`);

export const requestDeleteCartItems = (userName: string, cartIds: CartId[]) =>
  Promise.all(cartIds.map((cartId) => requestDeleteCartItem(userName, cartId)));

export const requestChangeCartItem = (item: CartItem) =>
  APIClient.put<CartItem>(`/cart/${item.cartId}`, item);
