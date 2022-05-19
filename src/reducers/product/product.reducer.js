import { actionTypes } from 'reducers/product/product.actions';

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
};

const productReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_PRODUCT_REQUEST) {
    return { ...state, isLoading: true };
  }

  if (action.type === actionTypes.GET_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      data: action.data,
    };
  }

  if (action.type === actionTypes.GET_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  return state;
};

export default productReducer;
