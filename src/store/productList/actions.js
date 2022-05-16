import { START_PRODUCT_LIST, SET_PRODUCT_LIST } from 'store/productList/actionTypes';

export const startProductList = () => ({
  type: START_PRODUCT_LIST,
});

export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: { productList },
});
