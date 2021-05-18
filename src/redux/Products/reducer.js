import { GET_PRODUCTS_ERROR, GET_PRODUCTS_PENDING, GET_PRODUCTS_SUCCESS, RESET_PRODUCTS } from './actions';

const initState = {
  productList: [],
  isLoading: false,
};

const productListReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_PENDING:
      return { ...state, isLoading: true };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: [...action.payload],
        isLoading: false,
      };

    case GET_PRODUCTS_ERROR:
      return { ...state, isLoading: false };

    case RESET_PRODUCTS:
      return initState;

    default:
      return state;
  }
};

export default productListReducer;
