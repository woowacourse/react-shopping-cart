import { Cart, RequestError } from "../../interface";
import { cartActionType } from "../../actions/cart";

const initialState: Cart & RequestError = {
  cart: [],
  requestErrorMessage: null,
};

const cartReducer = (
  state: Cart & RequestError = initialState,
  action: cartActionType
) => {
  switch (action.type) {
    case "cart/get/success":
      return {
        ...state,
        cart: [...action.payload.cart],
        requestErrorMessage: null,
      };

    case "cart/get/failure":
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
