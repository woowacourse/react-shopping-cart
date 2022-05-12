const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
const REQUEST_PRODUCTS_DONE = 'REQUEST_PRODUCTS_DONE';
const REQUEST_PRODUCTS_ERROR = 'REQUEST_PRODUCTS_ERROR';

export const requestProducts = () => ({ type: REQUEST_PRODUCTS });
export const requestProductsDone = (products) => ({ type: REQUEST_PRODUCTS_DONE, products });
export const requestProductsError = () => ({ type: REQUEST_PRODUCTS_ERROR });

const initialState = {
  products: [],
  requestProductsLoading: false,
  requestProductsDone: false,
  requestProductsError: '',
};

export default function product(state = initialState, action) {
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
