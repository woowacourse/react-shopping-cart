import axios from 'axios';
import { Dispatch } from 'redux';
import { STATUS_CODE, URL } from '../../constants';
import { FORMAT_DATA } from '../../services/formatData';
import { LOADING, LOADING_SUCCESS, LOADING_FAILURE, ProductsAction } from '../actionTypes/products';

export const getProducts = () => async (dispatch: Dispatch<ProductsAction>) => {
  dispatch({ type: LOADING });
  try {
    const response = await axios.get(URL.PRODUCTS);

    if (response.status !== STATUS_CODE.GET_SUCCESS) {
      throw new Error('');
    }

    dispatch({ type: LOADING_SUCCESS, payload: FORMAT_DATA.PRODUCTS(response.data) });
  } catch (error) {
    console.error(error);
    dispatch({ type: LOADING_FAILURE, loadingError: error });
  }
};
