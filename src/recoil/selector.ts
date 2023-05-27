import { selector } from 'recoil';
import type { CartItem, Product } from '../types/types';
import { CART_ITEMS_BASE_URL, PRODUCTS_BASE_URL } from '../constant';

export const productsQuery = selector<Product[]>({
  key: 'products',
  get: async () => {
    const response = await fetch(PRODUCTS_BASE_URL);

    if (!response.ok) throw new Error(response.status.toString());

    const products = await response.json();

    return products;
  },
});

export const cartListQuery = selector<CartItem[]>({
  key: 'cartList',
  get: async () => {
    const response = await fetch(CART_ITEMS_BASE_URL);

    if (!response.ok) throw new Error(response.status.toString());

    const cartList = await response.json();

    return cartList;
  },
});
