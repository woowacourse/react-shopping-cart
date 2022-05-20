import axios from 'axios';

import { getProductCartSuccess, getProductCartFail } from 'modules/cart';

import {
  openAddCartErrorModal,
  openAddCartModal,
  openAlreadyInCartModal,
  openDeleteProductCartErrorModal,
  openProductCountUpErrorModal,
} from 'modules/modal';

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

export const deleteProductCart = (id) => async (dispatch, getState) => {
  const cartProducts = getState().cart.cartProducts.filter(
    (product) => product.product_id !== Number(id),
  );

  try {
    await axios.delete('/mocking/cart', id);
    dispatch(getProductCartSuccess(cartProducts));
  } catch (error) {
    dispatch(openDeleteProductCartErrorModal(error));
  }
};

export const productCountEdit = (id, count) => async (dispatch, getState) => {
  const editCartProducts = getState().cart.cartProducts.map((product) =>
    product.product_id === Number(id)
      ? ((product.cart_product_count = count), { ...product })
      : product,
  );

  try {
    await axios.patch('/mocking/cart', { product_id: id, product_count: count });
    dispatch(getProductCartSuccess(editCartProducts));
  } catch (error) {
    dispatch(openProductCountUpErrorModal(error));
  }
};

export const checkCartProduct = (id, check) => (dispatch, getState) => {
  const editCartProducts = getState().cart.cartProducts.map((product) =>
    product.product_id === Number(id) ? ((product.cart_check = check), { ...product }) : product,
  );

  dispatch(getProductCartSuccess(editCartProducts));
};
