import {
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_DETAIL_PRODUCT_LOADING,
  GET_DETAIL_PRODUCT_SUCCESS,
  GET_DETAIL_PRODUCT_FAIL,
} from './action';

const initialState = {
  products: [],
  getProductLoading: false,
  getProductSuccess: false,
  getProductFail: '',
  detailProduct: '',
  getDetailProductLoading: false,
  getDetailProductSuccess: false,
  getDetailProductFail: '',
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
        getProductFail: action.error,
      };
    case GET_DETAIL_PRODUCT_LOADING:
      return {
        ...state,
        getDetailProductLoading: true,
        getDetailProductSuccess: false,
        getDetailProductFail: '',
      };
    case GET_DETAIL_PRODUCT_SUCCESS:
      return {
        ...state,
        getDetailProductLoading: false,
        getDetailProductSuccess: true,
        detailProduct: action.detailProduct,
        getDetailProductFail: '',
      };
    case GET_DETAIL_PRODUCT_FAIL:
      return {
        ...state,
        getDetailProductLoading: false,
        getDetailProductSuccess: false,
        getDetailProductFail: action.error,
      };
    default:
      return state;
  }
}

export default product;
