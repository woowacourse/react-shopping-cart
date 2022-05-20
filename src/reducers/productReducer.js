import {
  PRODUCT_INITIALIZE,
  PRODUCT_INITIALIZE_SUCCESS,
  PRODUCT_INITIALIZE_ERROR,
} from 'actions/action';

const initState = {
  products: {
    productListLoading: false,
    productList: [],
    productListError: null,
  },
};

function productReducer(state = initState, action) {
  switch (action.type) {
    case PRODUCT_INITIALIZE:
      return {
        ...state,
        products: {
          productListLoading: true,
          productList: [],
          productListError: null,
        },
      };
    case PRODUCT_INITIALIZE_SUCCESS:
      return {
        ...state,
        products: {
          productListLoading: false,
          productList: action.productList.data,
          productListError: null,
        },
      };
    case PRODUCT_INITIALIZE_ERROR:
      return {
        ...state,
        products: {
          productListLoading: false,
          productList: [],
          productListError: action.error,
        },
      };
    default:
      return state;
  }
}

export default productReducer;
