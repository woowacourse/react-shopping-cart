import type { CartProduct } from '../types/product';

export const STORAGE_ID = 'shop-cart';

export function getStoredCartProducts() {
  return JSON.parse(localStorage.getItem(STORAGE_ID) ?? '[]');
}

export function setStoredCartProducts(cartProducts: CartProduct[]) {
  localStorage.setItem(STORAGE_ID, JSON.stringify(cartProducts));
}
