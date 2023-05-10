import { CartList } from '../types/CartList.ts';

export const getCartListFromLocalStorage = () => {
  const cartList = localStorage.getItem('cartList');
  if (cartList) {
    return JSON.parse(cartList);
  }
  return {};
};

export const setCartListInLocalStorage = (newCartList: CartList) => {
  localStorage.setItem('cartList', JSON.stringify(newCartList));
};
