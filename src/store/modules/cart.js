import axios from 'axios';

const CART = {
  ADD: 'ADD_CART',
  DELETE: 'DELETE_CART',
  INCREASE_QUANTITY: 'INCREASE_QUANTITY',
  DECREASE_QUANTITY: 'DECREASE_QUANTITY',
  DELETE_SELECTED_CART: 'DELETE_SELECTED_CART',
};

const GET_CART = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

function getCartListAPI() {
  return axios.get(process.env.REACT_APP_CART_API_URL);
}

export const getCartList = () => async (dispatch) => {
  dispatch({type: GET_CART.PENDING});

  try {
    const response = await getCartListAPI();
    dispatch({
      type: GET_CART.SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CART.FAILURE,
      payload: err,
    });
    throw err;
  }
};

const INITIAL_STATE = {
  pending: false,
  error: false,
  cart: [],
};
Object.freeze(INITIAL_STATE);
Object.freeze(INITIAL_STATE.cart);

export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CART.PENDING: {
      return {
        ...state,
        pending: true,
        error: false,
      };
    }
    case GET_CART.SUCCESS: {
      const cart = action.payload;
      return {
        ...state,
        pending: false,
        cart,
      };
    }
    case GET_CART.FAILURE: {
      return {
        ...state,
        pending: false,
        error: true,
      };
    }
    case CART.ADD: {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }
    case CART.DELETE: {
      const id = action.payload;
      const newState = state.cart.filter((item) => item.id !== id);

      return {cart: newState};
    }
    case CART.INCREASE_QUANTITY: {
      const id = action.payload;
      const newState = state.cart.map((item) =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      );

      return {
        ...state,
        cart: newState,
      };
    }
    case CART.DECREASE_QUANTITY: {
      const id = action.payload;
      const newState = state.cart.map((item) =>
        item.id === id ? {...item, quantity: Math.max(item.quantity - 1, 1)} : item,
      );

      return {
        ...state,
        cart: newState,
      };
    }
    case CART.DELETE_SELECTED_CART: {
      const selectedCartItem = action.payload;
      const newState = state.cart.filter((item) => !selectedCartItem.includes(item.id));

      return {
        ...state,
        cart: newState,
      };
    }
    default:
      return state;
  }
}

export {CART};
