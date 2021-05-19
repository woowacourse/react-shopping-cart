import APIClient from '../../API';
import { CartItem } from '../../types';

export const requestShoppingCartItemList = (): Promise<CartItem[]> => APIClient.get('/cart');

export const requestAddShoppingCartItem = (item: CartItem) =>
  APIClient.post<CartItem>('/cart', item);

export const requestChangeShoppingCartItem = (item: CartItem) =>
  APIClient.put<CartItem>(`/cart/${item.id}`, item);

export const requestDeleteShoppingCartItem = (itemId: string) =>
  APIClient.delete(`/cart/${itemId}`);

export const requestChangeShoppingCartItemChecked = (item: CartItem) =>
  APIClient.put<CartItem>(`/cart/${item.id}`, item);

export const requestChangeAllShoppingCartItemChecked = (items: CartItem[], checked: boolean) => {
  Promise.all(
    items.map((item) => APIClient.put<CartItem>(`/cart/${item.id}`, { ...item, checked }))
  );
};

export const requestDeleteShoppingCartItems = (items: CartItem[]) => {
  Promise.all(items.map((item) => APIClient.delete(`/cart/${item.id}`)));
};

export const requestClearShoppingCartItems = async () => {
  const items = await requestShoppingCartItemList();

  return Promise.all(items.map((item) => APIClient.delete(`/cart/${item.id}`)));
};
