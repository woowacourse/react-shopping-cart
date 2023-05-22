import { CartList } from '../types/CartList.ts';
import localStorageKeys from '../constants/localStorageKeys.ts';

export const getCartListFromLocalStorage = (): CartList | null => {
  const cartList = localStorage.getItem(localStorageKeys.cartList);
  if (cartList) {
    return JSON.parse(cartList);
  }
  return null;
};

export const setCartListInLocalStorage = (newCartList: CartList) => {
  localStorage.setItem(localStorageKeys.cartList, JSON.stringify(newCartList));
};
