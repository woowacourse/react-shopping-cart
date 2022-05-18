import { START_PRODUCT, SET_PRODUCT, RESET_PRODUCT } from 'store/product/actionTypes';
import { ProductData } from 'types';

export const startProduct = () => ({
  type: START_PRODUCT,
});

export const setProduct = (product: ProductData) => ({
  type: SET_PRODUCT,
  payload: { product },
});

export const resetProduct = () => ({
  type: RESET_PRODUCT,
});
