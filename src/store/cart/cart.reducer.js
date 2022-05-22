import { actionTypes } from './cart.actions';

const initialState = {
  cart: [],
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_CART:
      return { ...state, cart: [...action.payload] };
    case actionTypes.DELETE_CART:
      return { ...state, cart: [...action.payload] };
    case actionTypes.UPDATE_ITEM_QUANTITY:
      return { ...state, cart: [...action.payload] };
    default:
      return state;
  }
}

export default cartReducer;
