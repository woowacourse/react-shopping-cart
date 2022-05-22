const REQUEST_PRODUCTS_ADD = 'REQUEST_PRODUCTS_ADD';
const REQUEST_PRODUCTS_ADD_FAIL = 'REQUEST_PRODUCTS_ADD_FAIL';

export const requestProductsAdd = (products) => ({ type: REQUEST_PRODUCTS_ADD, products });
export const requestProductsAddFail = (error) => ({ type: REQUEST_PRODUCTS_ADD_FAIL, error });

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
        isLoading: false,
        products: action.products,
      };
    case REQUEST_PRODUCTS_ADD_FAIL:
      return {
        ...state,
        isError: true,
        errorMessage: action.error,
      };
    default:
      return state;
  }
}
