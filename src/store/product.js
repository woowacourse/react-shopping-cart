import axios from 'axios';
import { PATH, SERVER_URL } from '../constants';

const ADD_TO_CARTS_SUCCESS = 'carts/ADD_TO_CARTS_SUCCESS';
const ADD_TO_CARTS_FAIL = 'carts/ADD_TO_CARTS_FAIL';
const DELETE_FROM_CARTS_SUCCESS = 'carts/DELETE_FROM_CARTS_SUCCESS';
const DELETE_FROM_CARTS_FAIL = 'carts/DELETE_FROM_CARTS_FAIL';

const initialState = {
  status: '',
  error: {},
};

const addToCartsSuccess = (status) => ({ type: ADD_TO_CARTS_SUCCESS, status });
const addToCartsFail = (error) => ({ type: ADD_TO_CARTS_FAIL, error });
const deleteFromCartsSuccess = (status) => ({
  type: DELETE_FROM_CARTS_SUCCESS,
  status,
});
const deleteFromCartsFail = (error) => ({
  type: DELETE_FROM_CARTS_FAIL,
  error,
});

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
    default:
      return state;
  }
};

export const addToCarts = (id) => async (dispatch) => {
  try {
    const result = await axios({
      url: `${SERVER_URL}/${PATH.CARTS}`,
      method: 'POST',
      data: { id, quantity: 1 },
    });

    dispatch(addToCartsSuccess(result.status));
  } catch (error) {
    dispatch(addToCartsFail(error));
  }
};

export const deleteFromCarts = (id) => async (dispatch) => {
  try {
    const result = await axios({
      url: `${SERVER_URL}/${PATH.CARTS}/${id}`,
      method: 'DELETE',
    });

    dispatch(deleteFromCartsSuccess(result.status));
  } catch (error) {
    dispatch(deleteFromCartsFail(error));
  }
};

export default productReducer;
