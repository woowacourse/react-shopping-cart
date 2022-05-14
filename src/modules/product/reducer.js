import { REQUEST_PRODUCTS, REQUEST_PRODUCTS_DONE, REQUEST_PRODUCTS_ERROR } from './action';

const initialState = {
  products: [],
  requestProductsLoading: false,
  requestProductsDone: false,
  requestProductsError: '',
};

function product(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return {
        ...state,
        requestProductsLoading: true,
        requestProductsDone: false,
        requestProductsError: '',
      };
    case REQUEST_PRODUCTS_DONE:
      return {
        ...state,
        requestProductsLoading: false,
        requestProductsDone: true,
        requestProductsError: '',
        products: [...state.products, ...action.products],
      };
    case REQUEST_PRODUCTS_ERROR:
      return {
        ...state,
        requestProductsLoading: false,
        requestProductsDone: false,
        requestProductsError: 'Error',
      };
    default:
      return state;
  }
}

export default product;
