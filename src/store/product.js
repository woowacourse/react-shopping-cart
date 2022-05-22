import axios from 'axios';

import { API } from 'constants/api';

const LOAD_PRODUCT_START = 'product/LOAD_PRODUCT_START';
const LOAD_PRODUCT_SUCCESS = 'product/LOAD_PRODUCT_SUCCESS';
const LOAD_PRODUCT_FAIL = 'product/LOAD_PRODUCT_FAIL';
const LOAD_PRODUCT_DONE = 'product/LOAD_PRODUCT_DONE';

const initialState = {
  isLoading: false,
  product: [],
  status: '',
  error: null,
};

const loadProductStart = () => ({ type: LOAD_PRODUCT_START });
const loadProductSuccess = (product) => ({
  type: LOAD_PRODUCT_SUCCESS,
  payload: product,
});
const loadProductFail = (error) => ({
  type: LOAD_PRODUCT_FAIL,
  payload: error,
});
const loadProductDone = () => ({ type: LOAD_PRODUCT_DONE });

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCT_START:
      return { ...state, isLoading: true };
    case LOAD_PRODUCT_SUCCESS:
      return { ...state, product: action.payload };
    case LOAD_PRODUCT_FAIL:
      return { ...state, error: action.payload };
    case LOAD_PRODUCT_DONE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export const loadProduct = (id) => async (dispatch) => {
  dispatch(loadProductStart());
  try {
    const result = await axios(`/${API.PRODUCT}/${id}`);
    dispatch(loadProductSuccess(result.data));
  } catch (error) {
    dispatch(loadProductFail(error));
  } finally {
    dispatch(loadProductDone());
  }
};

export default productReducer;
