import axios from 'axios';
import PATH from '../constants/path';

const LOAD_PRODUCTS_START = 'products/LOAD_START';
const LOAD_PRODUCTS_SUCCESS = 'products/LOAD_SUCCESS';
const LOAD_PRODUCTS_FAIL = 'products/LOAD_FAIL';
const LOAD_PRODUCTS_DONE = 'products/LOAD_DONE';

const initialState = {
  isLoading: false,
  products: [],
  error: null,
};

const loadProductsStart = () => ({ type: LOAD_PRODUCTS_START });
const loadProductsSuccess = (products) => ({
  type: LOAD_PRODUCTS_SUCCESS,
  payload: products,
});
const loadProductsFail = (error) => ({
  type: LOAD_PRODUCTS_FAIL,
  payload: error,
});
const loadProductsDone = () => ({
  type: LOAD_PRODUCTS_DONE,
});

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS_START:
      return { ...state, isLoading: true };
    case LOAD_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };
    case LOAD_PRODUCTS_FAIL:
      return { ...state, error: action.payload };
    case LOAD_PRODUCTS_DONE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export const loadProducts = () => async (dispatch) => {
  dispatch(loadProductsStart());
  try {
    const products = await axios(
      `${process.env.REACT_APP_SERVER_URL}/${PATH.PRODUCTS}`
    );
    dispatch(loadProductsSuccess(products.data));
  } catch (error) {
    dispatch(loadProductsFail(error));
  } finally {
    dispatch(loadProductsDone());
  }
};

export default productsReducer;
