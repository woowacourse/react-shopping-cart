import axios from 'axios';
import { SERVER_URL, PATH, ERROR_MESSAGE } from 'constants';

export const TYPE = {
  PRODUCTS_LOAD: 'products/load',
  LOADING: 'products/loading',
  ERROR: 'prodcuts/error',
};

const productsActionCreators = {
  loadProducts: (payload) => ({ type: TYPE.PRODUCTS_LOAD, payload }),
  loading: (payload) => ({ type: TYPE.LOADING, payload }),
  error: (payload) => ({ type: TYPE.ERROR, payload }),
};

export const loadProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${SERVER_URL}${PATH.PRODUCTS}`);

    dispatch(productsActionCreators.loadProducts(data));
  } catch (error) {
    dispatch(productsActionCreators.error(ERROR_MESSAGE.LOAD_PRODUCTS));
  } finally {
    dispatch(productsActionCreators.loading(false));
  }
};
