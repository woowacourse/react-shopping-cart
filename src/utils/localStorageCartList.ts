import { CartList } from '../types/CartList.ts';
import localStorageKeys from '../constants/localStorageKeys.ts';

export const getCartListFromLocalStorage = () => {
  const cartList = localStorage.getItem(localStorageKeys.cartList);
  if (cartList) {
    return JSON.parse(cartList);
  }
  return {};
};

export const setCartListInLocalStorage = (newCartList: CartList) => {
  localStorage.setItem('cartList', JSON.stringify(newCartList));
};
