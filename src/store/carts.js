import axios from 'axios';
import { SERVER_URL, PATH } from 'constants';
import { ERROR_MESSAGE } from '../constants';

const TYPE = {
  CARTS_LOAD: 'carts/load',
  CARTS_ADD: 'carts/add',
  CARTS_DELETE: 'carts/delete',
  CARTS_UPDATE: 'carts/update',
  CARTS_ERROR: 'carts/error',
  CARTS_CLEAN_ERROR: 'carts/clean',
};

const initialState = {
  carts: [],
  cartsError: null,
};

export const cartsActionCreators = {
  loadCarts: (payload) => ({ type: TYPE.CARTS_LOAD, payload }),
  addCart: (payload) => ({ type: TYPE.CARTS_ADD, payload }),
  deleteCart: (payload) => ({ type: TYPE.CARTS_DELETE, payload }),
  updateCartQuantity: (payload) => ({ type: TYPE.CARTS_UPDATE, payload }),
  error: (payload) => ({ type: TYPE.CARTS_ERROR, payload }),
  cleanError: (payload) => ({ type: TYPE.CARTS_CLEAN_ERROR, payload }),
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
      data: { ...product, quantity: 1 },
      method: 'POST',
    });
    dispatch(cartsActionCreators.addCart(data));
  } catch (error) {
    dispatch(cartsActionCreators.error(ERROR_MESSAGE.ADD_CART));
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
  }
};

export const updateCartQuantity = (product) => async (dispatch) => {
  try {
    await axios({
      url: `${SERVER_URL}${PATH.CARTS}/${product.id}`,
      data: { ...product },
      method: 'PUT',
    });
    dispatch(cartsActionCreators.updateCartQuantity(product));
  } catch (error) {
    dispatch(cartsActionCreators.error(ERROR_MESSAGE.UPDATE_CART_QUANTITY));
  }
};

export const cartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.CARTS_LOAD:
      return { ...state, carts: action.payload, cartsError: null };
    case TYPE.CARTS_ADD:
      return {
        ...state,
        carts: state.carts.concat(action.payload),
        cartsError: null,
      };
    case TYPE.CARTS_DELETE:
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.id !== action.payload),
        cartsError: null,
      };
    case TYPE.CARTS_UPDATE:
      return {
        ...state,
        carts: state.carts.map((cart) => {
          if (cart.id === action.payload.id) {
            return action.payload;
          }
          return cart;
        }),
        cartsError: null,
      };
    case TYPE.CARTS_ERROR:
      return { ...state, cartsError: action.payload };
    case TYPE.CARTS_CLEAN_ERROR:
      return { ...state, cartsError: null };
    default:
      return state;
  }
};
