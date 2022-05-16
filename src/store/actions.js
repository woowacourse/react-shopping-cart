import axios from 'axios';
import { SERVER_URL, PATH } from 'constants';
import TYPE from 'store/types';

const loadActionGenerator = (type, payload) => ({ type, payload });

const loadGenerator = (path, type) => () => async (dispatch) => {
  const { data } = await axios.get(`${SERVER_URL}${path}`);
  dispatch(loadActionGenerator(type, data));
};

export const loadProducts = loadGenerator(PATH.PRODUCTS, TYPE.PRODUCTS_LOAD);
export const loadCarts = loadGenerator(PATH.CARTS, TYPE.CARTS_LOAD);
