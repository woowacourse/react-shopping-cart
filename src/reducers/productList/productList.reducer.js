export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
export const GET_PRODUCT_LIST_SUCCESS = 'GET_PRODUCT_LIST_SUCCESS';
export const GET_PRODUCT_LIST_ERROR = 'GET_PRODUCT_LIST_ERROR';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const productListReducer = (state = initialState, action) => {
  if (action.type === GET_PRODUCT_LIST) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_PRODUCT_LIST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      data: action.data,
    };
  }
  if (action.type === GET_PRODUCT_LIST_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  return state;
};

export default productListReducer;
