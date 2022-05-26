import appClient from 'utils/appClient';

const ACTION = {
  GET_CART_PENDING: 'GET_CART_PENDING',
  GET_CART_SUCCESS: 'GET_CART_SUCCESS',
  GET_CART_FAILURE: 'GET_CART_FAILURE',

  ADD_CART_PENDING: 'ADD_CART_PENDING',
  ADD_CART_SUCCESS: 'ADD_CART_SUCCESS',
  ADD_CART_FAILURE: 'ADD_CART_FAILURE',

  DELETE_CART_PENDING: 'DELETE_CART_PENDING',
  DELETE_CART_SUCCESS: 'DELETE_CART_SUCCESS',
  DELETE_CART_FAILURE: 'DELETE_CART_FAILURE',

  EDIT_CART_PENDING: 'EDIT_CART_PENDING',
  EDIT_CART_SUCCESS: 'EDIT_CART_SUCCESS',
  EDIT_CART_FAILURE: 'EDIT_CART_FAILURE',
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
  dispatch({type: ACTION.ADD_CART_PENDING});
  try {
    const {data} = await appClient.post(`cart/${id}`);
    dispatch({type: ACTION.ADD_CART_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: ACTION.ADD_CART_FAILURE,
      payload: error,
      error: true,
    });
  }
};

export const deleteCart = (id) => async (dispatch) => {
  dispatch({type: ACTION.DELETE_CART_PENDING});
  try {
    const {data} = await appClient.delete(`cart/${id}`);
    dispatch({type: ACTION.DELETE_CART_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: ACTION.DELETE_CART_FAILURE,
      payload: error,
      error: true,
    });
  }
};

export const editCart = (id, quantity) => async (dispatch) => {
  dispatch({type: ACTION.EDIT_CART_PENDING});
  try {
    const {data} = await appClient.put(`cart/${id}`, {quantity});
    dispatch({type: ACTION.EDIT_CART_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: ACTION.EDIT_CART_FAILURE,
      payload: error,
      error: true,
    });
  }
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
      const cartedItem = action.payload;
      return {
        ...state,
        pending: false,
        data: cartedItem,
      };
    }
    case ACTION.GET_CART_FAILURE: {
      return {
        ...state,
        pending: false,
        error: true,
      };
    }
    case ACTION.ADD_CART_PENDING: {
      return {
        ...state,
        pending: true,
        error: false,
      };
    }
    case ACTION.ADD_CART_SUCCESS: {
      const cartedItem = action.payload;
      return {
        ...state,
        pending: false,
        data: cartedItem,
      };
    }
    case ACTION.ADD_CART_FAILURE: {
      return {
        ...state,
        pending: false,
        error: true,
      };
    }
    case ACTION.DELETE_CART_PENDING: {
      return {
        ...state,
        pending: true,
        error: false,
      };
    }
    case ACTION.DELETE_CART_SUCCESS: {
      const cartedItem = action.payload;
      return {
        ...state,
        pending: false,
        data: cartedItem,
      };
    }
    case ACTION.DELETE_CART_FAILURE: {
      return {
        ...state,
        pending: false,
        error: true,
      };
    }
    case ACTION.EDIT_CART_PENDING: {
      return {
        ...state,
        pending: true,
        error: false,
      };
    }
    case ACTION.EDIT_CART_SUCCESS: {
      const cartedItem = action.payload;
      return {
        ...state,
        pending: false,
        data: cartedItem,
      };
    }
    case ACTION.EDIT_CART_FAILURE: {
      return {
        ...state,
        pending: false,
        error: true,
      };
    }
    default:
      return state;
  }
}

export {ACTION};
