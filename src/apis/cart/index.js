import axios from 'axios';

import { getProductCartSuccess, getProductCartFail, getCheckTotalCartProduct } from 'modules/cart';

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
  const cartProducts = getState().cart.cartProducts;

  if (!cartProducts.some((product) => product.product_id === Number(id))) {
    dispatch(openDeleteProductCartErrorModal('Error'));
    return;
  }

  try {
    await axios.delete('/mocking/cart', id);
    const editCartProducts = getState().cart.cartProducts.filter(
      (product) => product.product_id !== Number(id),
    );
    dispatch(getProductCartSuccess(editCartProducts));
    const cartProductCheckList = getState().cart.cartProducts.every(
      (product) => product.cart_check,
    );
    dispatch(getCheckTotalCartProduct(cartProductCheckList));
  } catch (error) {
    dispatch(openDeleteProductCartErrorModal(error));
  }
};

export const deleteSelectProductCart = () => async (dispatch, getState) => {
  const cartProducts = getState().cart.cartProducts;
  const deleteCartProductsId = cartProducts.map(
    (product) => product.cart_check && product.product_id,
  );
  const editCartProducts = cartProducts.filter((product) => !product.cart_check);

  try {
    Promise.all([
      deleteCartProductsId.forEach((productId) => axios.delete('/mocking/cart', productId)),
    ]);
    dispatch(getProductCartSuccess(editCartProducts));
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
  const cartProductCheckList = getState().cart.cartProducts.every((product) => product.cart_check);

  // cartProductCheckList = false 된다면 전체체크 박스 미체크
  if (cartProductCheckList) {
    dispatch(getCheckTotalCartProduct(true));
    // cartProductCheckList = true 전체체크 박스 체크
  } else {
    dispatch(getCheckTotalCartProduct(false));
  }
  dispatch(getProductCartSuccess(editCartProducts));
};

export const checkTotalCartProduct = (check) => (dispatch, getState) => {
  const cartProductCheckList = getState().cart.cartProducts.every((product) => product.cart_check);

  if (cartProductCheckList) {
    // cartProductCheckList = ture라면 전체 다 체크 없애기
    const editCartProducts = getState().cart.cartProducts.map(
      (product) => ((product.cart_check = false), { ...product }),
    );

    dispatch(getProductCartSuccess(editCartProducts));
  } else {
    // cartProductCheckList = false라면 전체 체크
    const editCartProducts = getState().cart.cartProducts.map(
      (product) => ((product.cart_check = true), { ...product }),
    );

    dispatch(getProductCartSuccess(editCartProducts));
  }

  dispatch(getCheckTotalCartProduct(check));
};
