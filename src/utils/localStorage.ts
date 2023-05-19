import type { CartProduct } from '../types/product';

export const STORAGE_ID = 'shop-cart';

export const storedCartProducts: CartProduct[] = JSON.parse(
  localStorage.getItem(STORAGE_ID) ?? '[]'
);

export const setStoredCartProducts = (cartProducts: CartProduct[]) => {
  localStorage.setItem(STORAGE_ID, JSON.stringify(cartProducts));
};
