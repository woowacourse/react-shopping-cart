import { actionTypes } from './cart.actions';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CART:
    case actionTypes.DELETE_CART:
    case actionTypes.UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.ADD_CART_SUCCESS:
    case actionTypes.DELETE_CART_SUCCESS:
    case actionTypes.UPDATE_ITEM_QUANTITY_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case actionTypes.ADD_CART_ERROR:
    case actionTypes.DELETE_CART_ERROR:
    case actionTypes.UPDATE_ITEM_QUANTITY_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default cartReducer;
