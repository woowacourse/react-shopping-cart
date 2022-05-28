import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_ERROR,
} from 'store/productList/actionTypes';
import { ProductData } from 'types';

export const getProductList = () => ({
  type: GET_PRODUCT_LIST,
});

export const getProductListSuccess = (productList: ProductData[]) => ({
  type: GET_PRODUCT_LIST_SUCCESS,
  payload: { productList },
});

export const getProductListError = () => ({
  type: GET_PRODUCT_LIST_ERROR,
});
