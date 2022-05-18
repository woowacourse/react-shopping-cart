import { START_PRODUCT_LIST, SET_PRODUCT_LIST } from 'store/productList/actionTypes';
import { ProductData } from 'types';

export const startProductList = () => ({
  type: START_PRODUCT_LIST,
});

export const setProductList = (productList: ProductData[]) => ({
  type: SET_PRODUCT_LIST,
  payload: { productList },
});
