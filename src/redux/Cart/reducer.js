import { ADD_TO_CART_SUCCESS } from './actions';

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      return [...state, action.product];

    default:
      return state;
  }
};

export default cartReducer;
