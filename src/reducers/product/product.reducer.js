export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_ERROR = 'GET_PRODUCT_ERROR';

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
};

const productReducer = (state = initialState, action) => {
  if (action.type === GET_PRODUCT) {
    return { ...state, isLoading: true };
  }

  if (action.type === GET_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      data: action.data,
    };
  }

  if (action.type === GET_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  return state;
};

export default productReducer;
