import axios from 'axios';
import PATH from '../constants/path';
import { addProduct, deleteProduct } from './carts';

const LOAD_PRODUCT_START = 'product/LOAD_PRODUCT_START';
const LOAD_PRODUCT_SUCCESS = 'product/LOAD_PRODUCT_SUCCESS';
const LOAD_PRODUCT_FAIL = 'product/LOAD_PRODUCT_FAIL';
const LOAD_PRODUCT_DONE = 'product/LOAD_PRODUCT_DONE';

const ADD_TO_CARTS_SUCCESS = 'carts/ADD_TO_CARTS_SUCCESS';
const ADD_TO_CARTS_FAIL = 'carts/ADD_TO_CARTS_FAIL';
const DELETE_FROM_CARTS_SUCCESS = 'carts/DELETE_FROM_CARTS_SUCCESS';
const DELETE_FROM_CARTS_FAIL = 'carts/DELETE_FROM_CARTS_FAIL';

const initialState = {
  isLoading: false,
  product: null,
  status: '',
  error: null,
};

const addToCartsSuccess = (status) => ({
  type: ADD_TO_CARTS_SUCCESS,
  payload: status,
});
const addToCartsFail = (error) => ({ type: ADD_TO_CARTS_FAIL, payload: error });
const deleteFromCartsSuccess = (status) => ({
  type: DELETE_FROM_CARTS_SUCCESS,
  status,
});
const deleteFromCartsFail = (error) => ({
  type: DELETE_FROM_CARTS_FAIL,
  error,
});
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
    case ADD_TO_CARTS_SUCCESS:
      return { ...state, status: action.payload };
    case ADD_TO_CARTS_FAIL:
      return { ...state, error: action.payload };
    case DELETE_FROM_CARTS_SUCCESS:
      return { ...state, status: action.payload };
    case DELETE_FROM_CARTS_FAIL:
      return { ...state, error: action.payload };
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

export const addToCarts = (id) => async (dispatch) => {
  try {
    const result = await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/${PATH.CARTS}`,
      method: 'POST',
      data: { id, quantity: 1 },
    });

    dispatch(addProduct(id));
    dispatch(addToCartsSuccess(result.status));
  } catch (error) {
    dispatch(addToCartsFail(error));
  }
};

export const deleteFromCarts = (id) => async (dispatch) => {
  try {
    const result = await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/${PATH.CARTS}/${id}`,
      method: 'DELETE',
    });

    dispatch(deleteProduct(id));
    dispatch(deleteFromCartsSuccess(result.status));
  } catch (error) {
    dispatch(deleteFromCartsFail(error));
  }
};

export const loadProduct = (id) => async (dispatch) => {
  dispatch(loadProductStart());
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/${PATH.PRODUCTS}/${id}`
    );

    dispatch(loadProductSuccess(result.data));
  } catch (error) {
    dispatch(loadProductFail(error));
  } finally {
    dispatch(loadProductDone());
  }
};

export default productReducer;
