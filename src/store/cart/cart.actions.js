import axios from 'axios';
import { SERVER_PATH } from '../../constants';

const actionTypes = {
  ADD_CART: 'ADD_CART',
  ADD_CART_SUCCESS: 'ADD_CART_SUCCESS',
  ADD_CART_ERROR: 'ADD_CART_ERROR',

  DELETE_CART: 'DELETE_CART',
  DELETE_CART_SUCCESS: 'DELETE_CART_SUCCESS',
  DELETE_CART_ERROR: 'DELETE_CART_ERROR',

  UPDATE_ITEM_QUANTITY: 'UPDATE_ITEM_QUANTITY',
  UPDATE_ITEM_QUANTITY_SUCCESS: 'UPDATE_ITEM_QUANTITY_SUCCESS',
  UPDATE_ITEM_QUANTITY_ERROR: 'UPDATE_ITEM_QUANTITY_ERROR',
};

const addCartItemAsync = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_CART });
    const { data } = await axios.post(`${SERVER_PATH.CART}/${id}`);
    dispatch({
      type: actionTypes.ADD_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.ADD_CART_ERROR });
  }
};

const deleteCartItemAsync = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_CART });
    const { data } = await axios.delete(`${SERVER_PATH.CART}/${id}`);
    dispatch({
      type: actionTypes.DELETE_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_CART_ERROR });
  }
};

const updateItemQuantityAsync = (id, quantity) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_ITEM_QUANTITY });
    const { data } = await axios.put(`${SERVER_PATH.CART}/${id}`, { quantity });
    dispatch({
      type: actionTypes.UPDATE_ITEM_QUANTITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_ITEM_QUANTITY_ERROR });
  }
};

export { addCartItemAsync, deleteCartItemAsync, updateItemQuantityAsync, actionTypes };
