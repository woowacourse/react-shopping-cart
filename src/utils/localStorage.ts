import type { CartProduct } from '../types/product';

export const CART_PRODUCT_STORAGE_KEY = 'shop-cart-product';

export function getStoredCartProducts() {
  return JSON.parse(localStorage.getItem(CART_PRODUCT_STORAGE_KEY) ?? '[]');
}

export function setStoredCartProducts(cartProducts: CartProduct[]) {
  localStorage.setItem(CART_PRODUCT_STORAGE_KEY, JSON.stringify(cartProducts));
}
