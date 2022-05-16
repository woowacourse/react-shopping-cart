import { START_PRODUCT_LIST, SET_PRODUCT_LIST } from 'store/productList/actionTypes';

const initialState = {
  productList: [],
  isLoading: false,
  isLoaded: false,
};

const productListReducer = (state = initialState, action) => {
  if (action.type === START_PRODUCT_LIST) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SET_PRODUCT_LIST) {
    return {
      ...state,
      productList: action.payload.productList,
      isLoading: false,
      isLoaded: true,
    };
  }
  return state;
};

export default productListReducer;
