const REQUEST_CART_ADD = 'REQUEST_CART_ADD';
const REQUEST_CART_ADD_FAIL = 'REQUEST_CART_ADD_FAIL';

export const requestCartAdd = (product) => ({ type: REQUEST_CART_ADD, product });
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
    default:
      return state;
  }
}
