import APIClient from '../API';
import { ItemInCart, Product } from '../types';

export const requestProductList = (): Promise<Product[]> => APIClient.get('/productList');

export const requestShoppingCartItemList = (): Promise<ItemInCart[]> => APIClient.get('/cart');

export const requestAddShoppingCartItem = (item: ItemInCart) =>
  APIClient.post<ItemInCart>('/cart', item);
