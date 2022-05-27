import updateObject from 'modules/reducerUtilities';

const REQUEST_PRODUCTS_ADD = 'REQUEST_PRODUCTS_ADD';
const REQUEST_PRODUCTS_ADD_FAIL = 'REQUEST_PRODUCTS_ADD_FAIL';
const REQUEST_IS_LOADING_TRUE = 'REQUEST_IS_LOADING_TRUE';

// action 생성 함수
export const requestProductsAdd = (products) => ({ type: REQUEST_PRODUCTS_ADD, products });
export const requestProductsAddFail = (error) => ({ type: REQUEST_PRODUCTS_ADD_FAIL, error });
export const requestIsLoadingTrue = () => ({ type: REQUEST_IS_LOADING_TRUE });

// state
const initialState = {
  products: [],
  isError: false,
  isLoading: true,
  errorMessage: '',
};

// case reducer
const setStateProductsAdd = (state, action) => {
  return updateObject(state, {
    products: action.products,
    isLoading: false,
  });
};

const setStateProductsAddFail = (state, action) => {
  return updateObject(state, {
    isError: true,
    isLoading: false,
    errorMessage: action.error,
  });
};

const setStateIsLodingTrue = (state) => {
  return updateObject(state, {
    isLoading: true,
  });
};

// reducer
export default function product(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS_ADD:
      return setStateProductsAdd(state, action);
    case REQUEST_PRODUCTS_ADD_FAIL:
      return setStateProductsAddFail(state, action);
    case REQUEST_IS_LOADING_TRUE:
      return setStateIsLodingTrue(state);
    default:
      return state;
  }
}
