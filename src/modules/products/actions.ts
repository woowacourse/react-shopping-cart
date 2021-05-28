import { Dispatch } from 'redux';
import { requestGetProducts } from '../../apis/products';
import { parseProductData } from '../../utils/parseData';
import { ProductsAction } from './type';

export const GET_PRODUCTS_REQUEST = 'products/GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'products/GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'products/GET_PRODUCTS_FAILURE';

export const getProducts = () => async (dispatch: Dispatch<ProductsAction>) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });
  try {
    const response = await requestGetProducts();
    const products = response.data.map(parseProductData);
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_PRODUCTS_FAILURE, error });
  }
};
