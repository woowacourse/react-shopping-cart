import { actionTypes } from 'reducers/productList/productList.actions';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const productListReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_PRODUCT_LIST) {
    return { ...state, isLoading: true };
  }
  if (action.type === actionTypes.GET_PRODUCT_LIST_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      data: action.data,
    };
  }
  if (action.type === actionTypes.GET_PRODUCT_LIST_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  return state;
};

export default productListReducer;
