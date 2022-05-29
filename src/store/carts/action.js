import axios from 'axios';
import { SERVER_URL, PATH, ERROR_MESSAGE } from 'constants';

export const TYPE = {
  CARTS_LOAD: 'carts/load',
  CARTS_ADD: 'carts/add',
  CARTS_DELETE: 'carts/delete',
  CARTS_UPDATE: 'carts/update',
  CARTS_ERROR: 'carts/error',
};

export const cartsActionCreators = {
  loadCarts: (payload) => ({ type: TYPE.CARTS_LOAD, payload }),
  addCart: (payload) => ({ type: TYPE.CARTS_ADD, payload }),
  deleteCart: (payload) => ({ type: TYPE.CARTS_DELETE, payload }),
  updateCart: (payload) => ({ type: TYPE.CARTS_UPDATE, payload }),
  error: (payload) => ({ type: TYPE.CARTS_ERROR, payload }),
};

export const loadCarts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${SERVER_URL}${PATH.CARTS}`);

    dispatch(cartsActionCreators.loadCarts(data));
  } catch (error) {
    dispatch(cartsActionCreators.error(ERROR_MESSAGE.LOAD_CARTS));
  }
};

export const addCart = (product) => async (dispatch) => {
  try {
    const { data } = await axios({
      url: `${SERVER_URL}${PATH.CARTS}`,
      data: { ...product, quantity: 1, checked: true },
      method: 'POST',
    });
    dispatch(cartsActionCreators.addCart(data));
  } catch (error) {
    dispatch(cartsActionCreators.error(ERROR_MESSAGE.ADD_CART));
    alert(ERROR_MESSAGE.ADD_CART);
  }
};

export const deleteCart = (id) => async (dispatch) => {
  try {
    await axios({
      url: `${SERVER_URL}${PATH.CARTS}/${id}`,
      method: 'DELETE',
    });

    dispatch(cartsActionCreators.deleteCart(id));
  } catch (error) {
    dispatch(cartsActionCreators.error(ERROR_MESSAGE.DELETE_CART));
    alert(ERROR_MESSAGE.DELETE_CART);
  }
};

export const updateCart = (product) => async (dispatch) => {
  try {
    await axios({
      url: `${SERVER_URL}${PATH.CARTS}/${product.id}`,
      data: { ...product },
      method: 'PUT',
    });
    dispatch(cartsActionCreators.updateCart(product));
  } catch (error) {
    dispatch(cartsActionCreators.error(ERROR_MESSAGE.UPDATE_CART_QUANTITY));
    alert(ERROR_MESSAGE.UPDATE_CART_QUANTITY);
  }
};
