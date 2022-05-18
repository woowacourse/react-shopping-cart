import { SET_CART_PRODUCT_LIST, START_CART_PRODUCT_LIST } from 'store/cartProductList/actionTypes';
import { CartProductData } from 'types';

export const startCartProductList = () => ({
  type: START_CART_PRODUCT_LIST,
});

export const setCartProductList = (cartProductList: CartProductData[]) => ({
  type: SET_CART_PRODUCT_LIST,
  payload: { cartProductList },
});
