import { Loading, Animation, RequestError, CartItem } from "../../types";
import { CartActionType, cartActionType } from "../../actions/cart";

interface InitialState extends Loading, Animation, RequestError {
  cart: CartItem[];
}

const initialState: InitialState = {
  cart: [],
  loading: false,
  animation: {
    isShow: false,
  },
  requestErrorMessage: null,
};

const cartReducer = (state: InitialState = initialState, action: CartActionType) => {
  switch (action.type) {
    case cartActionType.get.request:
      return {
        ...state,
        loading: true,
      };

    case cartActionType.get.success:
      return {
        ...state,
        cart: action.payload,
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
