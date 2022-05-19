import axios from 'axios';

import { getProductCartSuccess, getProductCartFail, deleteProductCartFail } from 'modules/cart';
import { openAddCartErrorModal, openAddCartModal, openAlreadyInCartModal } from 'modules/modal';

export const getCartList = () => async (dispatch) => {
  try {
    const response = await axios.get('/mocking/cart');
    const cartProducts = response.data;

    dispatch(getProductCartSuccess(cartProducts));
  } catch (error) {
    dispatch(getProductCartFail(error));
  }
};

export const addProductCart =
  ({ id }) =>
  async (dispatch) => {
    try {
      const response = await axios.post('/mocking/cart', id);
      if (response.data === 'same product in cart') {
        dispatch(openAlreadyInCartModal());
        return;
      }
      dispatch(openAddCartModal());
    } catch (error) {
      dispatch(openAddCartErrorModal(error));
    }
  };

export const deleteProductCart =
  ({ id }) =>
  (dispatch) => {
    try {
      axios.delete('/mocking/cart', id);
      dispatch(getCartList());
      return;
    } catch (error) {
      dispatch(deleteProductCartFail(error));
    }
  };
