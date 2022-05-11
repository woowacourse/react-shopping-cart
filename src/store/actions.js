import axios from 'axios';
import { SERVER_URL } from '../constants';

const loadActionGenerator = (type, payload) => ({ type, payload });

// eslint-disable-next-line import/prefer-default-export
export const loadProducts = () => async (dispatch) => {
  const { data } = await axios.get(`${SERVER_URL}/products`);
  dispatch(loadActionGenerator('LOAD_PRODUCTS', data));
};

export const loadCarts = () => async (dispatch) => {
  const { data } = await axios.get(`${SERVER_URL}/carts`);
  dispatch(loadActionGenerator('LOAD_CARTS', data));
};
