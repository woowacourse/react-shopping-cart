import axios from 'axios';
import { SERVER_URL, PATH } from 'constants';
import TYPE from 'store/types';

const actionCreators = {
  loadProducts: (payload) => ({ type: TYPE.PRODUCTS_LOAD, payload }),
  loadCarts: (payload) => ({ type: TYPE.CARTS_LOAD, payload }),
  addCart: (payload) => ({ type: TYPE.CARTS_ADD, payload }),
  deleteCart: (payload) => ({ type: TYPE.CARTS_DELETE, payload }),
};

export const loadProducts = () => async (dispatch) => {
  const { data } = await axios.get(`${SERVER_URL}${PATH.PRODUCTS}`);

  dispatch(actionCreators.loadProducts(data));
};

export const loadCarts = () => async (dispatch) => {
  const { data } = await axios.get(`${SERVER_URL}${PATH.CARTS}`);

  dispatch(actionCreators.loadCarts(data));
};

export const addCart = (id) => async (dispatch) => {
  const { data } = await axios({
    url: `${SERVER_URL}${PATH.CARTS}`,
    data: { id, quantity: 1 },
    method: 'POST',
  });
  dispatch(actionCreators.addCart(data));
};

export const deleteCart = (id) => async (dispatch) => {
  try {
    await axios({
      url: `${SERVER_URL}${PATH.CARTS}/${id}`,
      method: 'DELETE',
    });

    dispatch(actionCreators.deleteCart(id));
  } catch (error) {
    console.log('errorL ', error.messages);
  }
};
