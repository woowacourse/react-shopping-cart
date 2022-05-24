const REQUEST_PRODUCTS_ADD = 'REQUEST_PRODUCTS_ADD';
const REQUEST_PRODUCTS_ADD_FAIL = 'REQUEST_PRODUCTS_ADD_FAIL';
const REQUEST_IS_LOADING_TRUE = 'REQUEST_IS_LOADING_TRUE';

export const requestProductsAdd = (products) => ({ type: REQUEST_PRODUCTS_ADD, products });
export const requestProductsAddFail = (error) => ({ type: REQUEST_PRODUCTS_ADD_FAIL, error });
export const requestIsLoadingTrue = () => ({ type: REQUEST_IS_LOADING_TRUE });

const initialState = {
  products: [],
  isError: false,
  isLoading: true,
  errorMessage: '',
};

export default function product(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS_ADD:
      return {
        ...state,
        products: action.products,
        isLoading: false,
      };
    case REQUEST_PRODUCTS_ADD_FAIL:
      return {
        ...state,
        isError: true,
        isLoading: false,
        errorMessage: action.error,
      };
    case REQUEST_IS_LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
