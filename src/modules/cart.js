const REQUEST_CART_ADD = 'REQUEST_CART_ADD';
const REQUEST_CART_ADD_FAIL = 'REQUEST_CART_ADD_FAIL';
const REQUEST_EXIST_PRODUCT_ADD = 'REQUEST_EXIST_PRODUCT_ADD';
const REQUEST_PRODUCT_DELETE = 'REQUEST_PRODUCT_DELETE';
const REQUEST_PRODUCT_CHECK = 'REQUEST_PRODUCT_CHECK';
const REQUEST_PRODUCT_ALL_CHECK = 'REQUEST_PRODUCT_ALL_CHECK';
const REQUEST_ALL_CHECKBOX_TRUE = 'REQUEST_ALL_CHECKBOX_TRUE';
const REQUEST_ALL_CHECKBOX_FALSE = 'REQUEST_ALL_CHECKBOX_FALSE';

export const requestCartAdd = (product) => ({ type: REQUEST_CART_ADD, product });
export const requestExistProductAdd = (newCarts) => ({ type: REQUEST_EXIST_PRODUCT_ADD, newCarts });
export const requestCartAddFail = (error) => ({ type: REQUEST_CART_ADD_FAIL, error });
export const requestProductDelete = (newCarts) => ({ type: REQUEST_PRODUCT_DELETE, newCarts });
export const requestProductCheck = (newCarts) => ({ type: REQUEST_PRODUCT_CHECK, newCarts });
export const requestProductAllCheck = (newCarts) => ({ type: REQUEST_PRODUCT_ALL_CHECK, newCarts });
export const requestAllCheckboxTrue = () => ({ type: REQUEST_ALL_CHECKBOX_TRUE });
export const requestAllCheckboxFalse = () => ({ type: REQUEST_ALL_CHECKBOX_FALSE });

const initialState = {
  carts: [],
  errorMessage: '',
  isCheckedAll: false,
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CART_ADD:
      return {
        ...state,
        carts: [...state.carts, action.product],
      };
    case REQUEST_CART_ADD_FAIL:
      return {
        ...state,
        errorMessage: action.error,
      };
    case REQUEST_EXIST_PRODUCT_ADD:
      return {
        ...state,
        carts: action.newCarts,
      };
    case REQUEST_PRODUCT_DELETE:
      return {
        ...state,
        carts: action.newCarts,
      };
    case REQUEST_PRODUCT_CHECK:
      return {
        ...state,
        carts: action.newCarts,
      };
    case REQUEST_PRODUCT_ALL_CHECK:
      return {
        ...state,
        carts: action.newCarts,
        isCheckedAll: !state.isCheckedAll,
      };
    case REQUEST_ALL_CHECKBOX_TRUE:
      return {
        ...state,
        isCheckedAll: true,
      };
    case REQUEST_ALL_CHECKBOX_FALSE:
      return {
        ...state,
        isCheckedAll: false,
      };
    default:
      return state;
  }
}
