export const GET_CART_LIST = 'GET_CART_LIST';
export const GET_CART_LIST_SUCCESS = 'GET_CART_LIST_SUCCESS';
export const GET_CART_LIST_ERROR = 'GET_CART_LIST_ERROR';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const cartListReducer = (state = initialState, action) => {
  if (action.type === GET_CART_LIST) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_CART_LIST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      data: action.data,
    };
  }

  if (action.type === GET_CART_LIST_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  return state;
};

export default cartListReducer;
