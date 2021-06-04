import { ACTION_TYPE } from '../constants';

const initialState = {
  cart: [],
};

export const addItemToCart = data => {
  return {
    type: ACTION_TYPE.ADD_ITEM_TO_CART,
    payload: data,
  };
};

export const setCartItemList = data => {
  return {
    type: ACTION_TYPE.SET_CART_ITEM_LIST,
    payload: data,
  };
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_ITEM_TO_CART:
      return {
        ...state,
        cart: [
          ...state.cart.filter(({ cart_id }) => cart_id !== action.payload.cart_id),
          action.payload,
        ],
      };

    case ACTION_TYPE.SET_CART_ITEM_LIST:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};
