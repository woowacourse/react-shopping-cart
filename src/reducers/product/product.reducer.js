import { actionTypes } from 'reducers/product/product.actions';

const initialState = {
  data: null,
  isLoading: false,
  isSucceed: false,
  isError: false,
};

const productReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_PRODUCT_REQUEST) {
    return { ...state, isLoading: true, isSucceed: false, isError: false };
  }

  if (action.type === actionTypes.GET_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isSucceed: true,
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
