import axios from 'axios';

import { getProductCartSuccess, getProductCartFail } from 'modules/cart';
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

export const addProductCart = (target) => async (dispatch, getState) => {
  const products = getState().product.products;
  const addProduct = products.find((product) => product.product_id === Number(target.id));
  const cartInitProduct = Object.assign(addProduct, { cart_product_count: 1 });

  try {
    const response = await axios.post('/mocking/cart', cartInitProduct);
    if (response.data === 'same product in cart') {
      dispatch(openAlreadyInCartModal());
      return;
    }
    dispatch(openAddCartModal());
  } catch (error) {
    dispatch(openAddCartErrorModal(error));
  }
};
