import { Cart, Loading, Animation, RequestError } from "../../types";
import { CartActionType, cartActionType } from "../../actions/cart";

const initialState: Cart & Loading & Animation & RequestError = {
  cart: [],
  loading: false,
  animation: {
    isShow: false,
  },
  requestErrorMessage: null,
};

const cartReducer = (state: Cart & Loading & Animation & RequestError = initialState, action: CartActionType) => {
  switch (action.type) {
    case cartActionType.get.request:
      return {
        ...state,
        loading: true,
      };

    case cartActionType.get.success:
      return {
        ...state,
        cart: [...action.payload.cart],
        loading: false,
        requestErrorMessage: null,
      };

    case cartActionType.get.failure:
      return {
        ...state,
        loading: false,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    case cartActionType.post.request:
      return {
        ...state,
        loading: true,
      };

    case cartActionType.post.success:
      return {
        ...state,
        loading: false,
        requestErrorMessage: null,
      };

    case cartActionType.post.failure:
      return {
        ...state,
        loading: false,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    case cartActionType.delete.request:
      return {
        ...state,
        loading: true,
      };

    case cartActionType.delete.success:
      return {
        ...state,
        loading: false,
        requestErrorMessage: null,
      };

    case cartActionType.delete.failure:
      return {
        ...state,
        loading: false,
        requestErrorMessage: action.payload.requestErrorMessage,
      };

    case cartActionType.animation.show:
      return {
        ...state,
        animation: {
          isShow: true,
        },
      };

    case cartActionType.animation.hide:
      return {
        ...state,
        animation: {
          isShow: false,
        },
      };

    default:
      return state;
  }
};

export default cartReducer;
export { initialState };
