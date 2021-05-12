import { Cart, RequestError } from "../../interface";
import { CartActionType, cartActionType } from "../../actions/cart";

const initialState: Cart & RequestError = {
  cart: [],
  requestErrorMessage: null,
};

const cartReducer = (state: Cart & RequestError = initialState, action: CartActionType) => {
  switch (action.type) {
    case cartActionType.get.success:
      return {
        ...state,
        cart: [...action.payload.cart],
        requestErrorMessage: null,
      };

    case cartActionType.get.failure:
      return {
        ...state,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    case cartActionType.post.success:
      return {
        ...state,
        requestErrorMessage: null,
      };

    case cartActionType.post.failure:
      return {
        ...state,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    case cartActionType.delete.success:
      return {
        ...state,
        requestErrorMessage: null,
      };

    case cartActionType.delete.failure:
      return {
        ...state,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    default:
      return state;
  }
};

export default cartReducer;
export { initialState };
