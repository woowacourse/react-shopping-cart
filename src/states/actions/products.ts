import axios from 'axios';
import { Dispatch } from 'redux';
import { STATUS_CODE, URL } from '../../constants';
import { FORMAT_DATA } from '../../services/formatData';
import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  ProductsAction,
} from '../constants/actionTypes';

export const getProducts = () => async (dispatch: Dispatch<ProductsAction>) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });
  try {
    const response = await axios.get(URL.PRODUCTS);
    console.log(FORMAT_DATA.PRODUCTS(response.data));

    if (response.status !== STATUS_CODE.GET_SUCCESS) {
      throw new Error('');
    }

    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: FORMAT_DATA.PRODUCTS(response.data) });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_PRODUCTS_FAILURE, error });
  }
};
