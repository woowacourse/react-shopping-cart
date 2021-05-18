import axios from 'axios';
import { Dispatch } from 'redux';
import { STATUS_CODE, URL } from '../../constants';
import { FORMAT_DATA } from '../../services/formatData';
import { REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE, ProductsAction } from '../actionTypes/products';

export const getProducts = () => async (dispatch: Dispatch<ProductsAction>) => {
  dispatch({ type: REQUEST });
  try {
    const response = await axios.get(URL.PRODUCTS);

    if (response.status !== STATUS_CODE.GET_SUCCESS) {
      throw new Error('');
    }

    dispatch({ type: REQUEST_SUCCESS, payload: FORMAT_DATA.PRODUCTS(response.data) });
  } catch (error) {
    console.error(error);
    dispatch({ type: REQUEST_FAILURE, error });
  }
};
