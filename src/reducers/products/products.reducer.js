import actionTypes from 'reducers/products/products.actionTypes';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const productsReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_PRODUCTS) {
    return { ...state, isLoading: true };
  }
  if (action.type === actionTypes.GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
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
