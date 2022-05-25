import { combineReducers } from "redux";
import { ACTIONS } from "./actions";

const initialState = {
  cart: {
    data: [],
  },
};

export const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case ACTIONS.SET_CART_ITEM_LIST:
      return {
        data: action.payload,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cartReducer,
});

export default rootReducer;
