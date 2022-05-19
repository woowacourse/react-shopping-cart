import appClient from 'utils/appClient';

const ACTION = {
  GET_CART_PENDING: 'GET_CART_PENDING',
  GET_CART_SUCCESS: 'GET_CART_SUCCESS',
  GET_CART_FAILURE: 'GET_CART_FAILURE',
  ADD_CART: 'ADD_CART',
  DELETE_CART: 'DELETE_CART',
  EDIT_CART: 'EDIT_CART',
};

export const getCart = () => async (dispatch) => {
  dispatch({type: ACTION.GET_CART_PENDING});
  try {
    const {data} = await appClient.get('cart');
    dispatch({
      type: ACTION.GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTION.GET_CART_FAILURE,
      payload: error,
      error: true,
    });
  }
};

export const postCart = (id) => async (dispatch) => {
  const {data} = await appClient.post(`cart/${id}`);
  dispatch({type: ACTION.ADD_CART, payload: data});
};

export const deleteCart = (id) => async (dispatch) => {
  const {data} = await appClient.delete(`cart/${id}`);
  dispatch({type: ACTION.DELETE_CART, payload: data});
};

export const editCart = (id, quantity) => async (dispatch) => {
  const {data} = await appClient.put(`cart/${id}`, {quantity});
  dispatch({type: ACTION.EDIT_CART, payload: data});
};

const initialState = {
  pending: false,
  error: false,
  data: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_CART_PENDING: {
      return {
        ...state,
        pending: true,
        error: false,
      };
    }
    case ACTION.GET_CART_SUCCESS: {
      const productItem = action.payload;
      return {
        ...state,
        pending: false,
        data: productItem,
      };
    }
    case ACTION.GET_CART_FAILURE: {
      return {
        ...state,
        pending: false,
        error: true,
      };
    }
    case ACTION.ADD_CART: {
      const cartedItem = action.payload;
      return {
        ...state,
        data: cartedItem,
      };
    }
    case ACTION.DELETE_CART: {
      const cartedItem = action.payload;
      return {
        ...state,
        data: cartedItem,
      };
    }
    case ACTION.EDIT_CART: {
      const cartedItem = action.payload;
      return {
        ...state,
        data: cartedItem,
      };
    }
    default:
      return state;
  }
}

export {ACTION};
