import axios from 'axios';

import {
  CART_INITIALIZE,
  CART_INITIALIZE_ERROR,
  CART_INITIALIZE_SUCCESS,
  CART_POST,
  CART_POST_ERROR,
  CART_POST_SUCCESS,
  CART_PUT,
  CART_PUT_SUCCESS,
  CART_PUT_ERROR,
  CART_DELETE,
  CART_DELETE_SUCCESS,
  CART_DELETE_ERROR,
} from 'actions/action';

import { LOCAL_URL } from 'constants/constants';

export const getShoppingCartList = () => async dispatch => {
  dispatch({ type: CART_INITIALIZE });
  try {
    const shoppingCartList = await axios.get(LOCAL_URL + 'shoppingCart');
    dispatch({ type: CART_INITIALIZE_SUCCESS, shoppingCartList });
  } catch (error) {
    dispatch({ type: CART_INITIALIZE_ERROR, error });
  }
};

export const putShoppingCartItem = productItem => async dispatch => {
  dispatch({ type: CART_PUT });
  try {
    await axios({
      method: 'put',
      url: LOCAL_URL + `shoppingCart/${productItem.id}`,
      data: productItem,
    });
    const shoppingCartList = await axios.get(LOCAL_URL + 'shoppingCart');
    dispatch({ type: CART_PUT_SUCCESS, shoppingCartList });
  } catch (error) {
    dispatch({ type: CART_PUT_ERROR, error });
  }
};

export const postShoppingCartItem = productItem => async dispatch => {
  dispatch({ type: CART_POST });
  try {
    await axios({
      method: 'post',
      url: LOCAL_URL + `shoppingCart`,
      data: productItem,
    });
    const shoppingCartList = await axios.get(LOCAL_URL + 'shoppingCart');
    dispatch({ type: CART_POST_SUCCESS, shoppingCartList });
  } catch (error) {
    dispatch({ type: CART_POST_ERROR, error });
  }
};

export const deleteShoppingCartItem = productItem => async dispatch => {
  dispatch({ type: CART_DELETE });
  try {
    await axios({
      method: 'delete',
      url: LOCAL_URL + `shoppingCart/${productItem.id}`,
      data: productItem,
    });
    const shoppingCartList = await axios.get(LOCAL_URL + 'shoppingCart');
    dispatch({ type: CART_DELETE_SUCCESS, shoppingCartList });
  } catch (error) {
    dispatch({ type: CART_DELETE_ERROR, error });
  }
};
