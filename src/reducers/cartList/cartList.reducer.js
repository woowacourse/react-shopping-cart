import { actionTypes } from 'reducers/cartList/cartList.actions';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const cartListReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_CART_LIST) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === actionTypes.GET_CART_LIST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      data: action.data,
    };
  }

  if (action.type === actionTypes.GET_CART_LIST_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  return state;
};

export default cartListReducer;
