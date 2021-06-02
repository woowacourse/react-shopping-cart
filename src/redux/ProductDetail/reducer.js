import { GET_PRODUCT_ERROR, GET_PRODUCT_PENDING, GET_PRODUCT_SUCCESS, RESET_PRODUCT } from './actions';

const initState = {
  product: null,
  isLoading: false,
};

const productDetailReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PRODUCT_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PRODUCT_SUCCESS:
      return {
        product: action.payload,
        isLoading: false,
      };

    case GET_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case RESET_PRODUCT:
      return initState;

    default:
      return state;
  }
};

export default productDetailReducer;
