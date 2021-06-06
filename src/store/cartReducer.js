import { ACTION_TYPE } from '../constants';

const initialState = {
  cart: [],
};

export const setCartItemList = data => {
  return {
    type: ACTION_TYPE.SET_CART_ITEM_LIST,
    payload: data,
  };
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_CART_ITEM_LIST:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};
