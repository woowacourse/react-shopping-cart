import { actionTypes } from 'reducers/products/products.actions';

const initialState = {
  data: [],
  isLoading: false,
  isSucceed: false,
  isError: false,
};

const productsReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_PRODUCTS_REQUEST) {
    return { ...state, isLoading: true, isSucceed: false, isError: false };
  }
  if (action.type === actionTypes.GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isSucceed: true,
      data: action.data,
    };
  }
  if (action.type === actionTypes.GET_PRODUCTS_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  return state;
};

export default productsReducer;
