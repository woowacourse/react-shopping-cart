const REQUEST_CART_ADD = 'REQUEST_CART_ADD';
const REQUEST_CART_ADD_FAIL = 'REQUEST_CART_ADD_FAIL';
const REQUEST_EXIST_PRODUCT_ADD = 'REQUEST_EXIST_PRODUCT_ADD';

export const requestCartAdd = (product) => ({ type: REQUEST_CART_ADD, product });
export const requestExistProductAdd = (newCarts) => ({ type: REQUEST_EXIST_PRODUCT_ADD, newCarts });
export const requestCartAddFail = (error) => ({ type: REQUEST_CART_ADD_FAIL, error });

const initialState = {
  carts: [],
  errorMessage: '',
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
    default:
      return state;
  }
}
