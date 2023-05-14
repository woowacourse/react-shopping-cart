import { LOCAL_STORAGE_KEY } from '../constants/index.ts';
import { CartList } from '../types/CartList.ts';

export const getCartListFromLocalStorage = () => {
  const cartList = localStorage.getItem(LOCAL_STORAGE_KEY.CART_ITEMS);
  if (cartList) {
    return JSON.parse(cartList);
  }
  return {};
};

export const setCartListInLocalStorage = (newCartList: CartList) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.CART_ITEMS, JSON.stringify(newCartList));
};
