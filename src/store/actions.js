import axios from 'axios';
import { SERVER_URL, PATH } from 'constants';
import TYPE from 'store/types';

const actionCreators = {
  loadProducts: (payload) => ({ type: TYPE.PRODUCTS_LOAD, payload }),
  loadCarts: (payload) => ({ type: TYPE.CARTS_LOAD, payload }),
};

export const loadProducts = () => async (dispatch) => {
  const { data } = await axios.get(`${SERVER_URL}${PATH.PRODUCTS}`);

  dispatch(actionCreators.loadProducts(data));
};

export const loadCarts = () => async (dispatch) => {
  const { data } = await axios.get(`${SERVER_URL}${PATH.CARTS}`);

  dispatch(actionCreators.loadCarts(data));
};
