import axios from 'axios';
import { SERVER_URL, PATH, ERROR_MESSAGE } from 'constants';

const TYPE = {
  PRODUCTS_LOAD: 'products/load',
  LOADING: 'products/loading',
  ERROR: 'prodcuts/error',
};

const initialState = {
  loading: true,
  products: [],
  productsError: null,
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

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.PRODUCTS_LOAD:
      return { ...state, products: action.payload, productsError: null };
    case TYPE.LOADING:
      return { ...state, loading: action.payload };
    case TYPE.ERROR:
      return { ...state, productsError: action.payload };
    default:
      return state;
  }
};
