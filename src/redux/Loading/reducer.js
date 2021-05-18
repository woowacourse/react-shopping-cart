import { GET_PRODUCTS_PENDING, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR } from '../Products/actions';

const initialState = {
  productsLoading: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_PENDING:
      return {
        ...state,
        productsLoading: action.productsLoading,
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsLoading: action.productsLoading,
      };

    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        productsLoading: action.productsLoading,
      };

    default:
      return state;
  }
};

export default loadingReducer;
