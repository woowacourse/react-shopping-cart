import axios from 'axios';
import { SERVER_URL, PATH } from 'constants';

const TYPE = {
  CARTS_LOAD: 'carts/load',
  CARTS_ADD: 'carts/add',
  CARTS_DELETE: 'carts/delete',
};

const initialState = {
  carts: [],
};

const actionCreators = {
  loadCarts: (payload) => ({ type: TYPE.CARTS_LOAD, payload }),
  addCart: (payload) => ({ type: TYPE.CARTS_ADD, payload }),
  deleteCart: (payload) => ({ type: TYPE.CARTS_DELETE, payload }),
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

export const cartsReducer = (state = initialState.carts, action) => {
  switch (action.type) {
    case TYPE.CARTS_LOAD:
      return { ...state, carts: action.payload };
    case TYPE.CARTS_ADD:
      return { ...state, carts: state.carts.concat(action.payload) };
    case TYPE.CARTS_DELETE:
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.id !== action.payload),
      };
    default:
      return state;
  }
};
