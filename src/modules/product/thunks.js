import { productAPI } from '../../api';
import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_LOADING, GET_PRODUCTS_SUCCESS } from './actions';

export const getProductsThunk = () => async dispatch => {
  dispatch({ type: GET_PRODUCTS_LOADING });
  try {
    const data = await productAPI.getProducts();

    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_PRODUCTS_FAILURE, payload: err });
  }
};
