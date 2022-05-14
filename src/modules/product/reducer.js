import { GET_PRODUCT_LOADING, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAIL } from './action';

const initialState = {
  products: [],
  getProductLoading: false,
  getProductSuccess: false,
  getProductFail: '',
};

function product(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_LOADING:
      return {
        ...state,
        getProductLoading: true,
        getProductSuccess: false,
        getProductFail: '',
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        getProductLoading: false,
        getProductSuccess: true,
        getProductFail: '',
        products: [...state.products, ...action.products],
      };
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        getProductLoading: false,
        getProductSuccess: false,
        getProductFail: 'Error',
      };
    default:
      return state;
  }
}

export default product;
