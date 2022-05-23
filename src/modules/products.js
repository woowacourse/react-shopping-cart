import axios from 'axios';

import {
  PRODUCT_INITIALIZE,
  PRODUCT_INITIALIZE_SUCCESS,
  PRODUCT_INITIALIZE_ERROR,
} from 'actions/action';

import { LOCAL_URL } from 'constants/constants';

export const getProductList = () => async dispatch => {
  dispatch({ type: PRODUCT_INITIALIZE });
  try {
    const productList = await axios.get(LOCAL_URL + 'products');
    setTimeout(() => dispatch({ type: PRODUCT_INITIALIZE_SUCCESS, productList }), 300);
  } catch (error) {
    dispatch({ type: PRODUCT_INITIALIZE_ERROR, error });
  }
};
