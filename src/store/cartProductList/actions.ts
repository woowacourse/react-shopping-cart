import {
  GET_CART_PRODUCT_LIST,
  GET_CART_PRODUCT_LIST_SUCCESS,
  GET_CART_PRODUCT_LIST_ERROR,
} from 'store/cartProductList/actionTypes';
import { CartProductData } from 'types';

export const getCartProductList = () => ({
  type: GET_CART_PRODUCT_LIST,
});

export const getCartProductListSuccess = (cartProductList: CartProductData[]) => ({
  type: GET_CART_PRODUCT_LIST_SUCCESS,
  payload: { cartProductList },
});

export const getCartProductListError = () => ({
  type: GET_CART_PRODUCT_LIST_ERROR,
});
