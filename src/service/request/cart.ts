import APIClient from '../../API';
import { ItemInCart } from '../../types';

export const requestShoppingCartItemList = (): Promise<ItemInCart[]> => APIClient.get('/cart');

export const requestShoppingCartItemToAdd = (item: ItemInCart) =>
  APIClient.post<ItemInCart>('/cart', item);

export const requestShoppingCartItemToChange = (item: ItemInCart) =>
  APIClient.put<ItemInCart>(`/cart/${item.id}`, item);

export const requestShoppingCartItemToDelete = (itemId: string) =>
  APIClient.delete(`/cart/${itemId}`);

export const requestAllShoppingCartItemToBeChecked = (items: ItemInCart[], checked: boolean) => {
  Promise.all(
    items.map((item) => APIClient.put<ItemInCart>(`/cart/${item.id}`, { ...item, checked }))
  );
};

export const requestShoppingCartItemsToDelete = (items: ItemInCart[]) => {
  Promise.all(items.map((item) => APIClient.delete(`/cart/${item.id}`)));
};

export const requestShoppingCartItemsToClear = async () => {
  const items = await requestShoppingCartItemList();

  return Promise.all(items.map((item) => APIClient.delete(`/cart/${item.id}`)));
};
