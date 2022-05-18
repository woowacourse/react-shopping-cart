import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_ERROR,
} from 'actions/productList';
import STATUS from 'constants/status';

const INITIAL_STATE = {
  productList: [],
  status: STATUS.LOADING,
  errorMessage: null,
};

function productListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return {
        ...state,
        status: STATUS.LOADING,
      };

    case GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        status: STATUS.SUCCESS,
        productList: state.productList.concat(action.payload.productList),
      };

    case GET_PRODUCT_LIST_ERROR:
      return {
        ...state,
        status: STATUS.ERROR,
        errorMessage: action.payload.errorMessage,
      };

    default:
      return state;
  }
}

export default productListReducer;
