import { CartType } from "../../types/cart";
import createReducer from "../createReducer";
import { Cart } from "./type";

const POST_CART_SUCCESS = "cart/POST_CART_SUCCESS" as const;

const INITIAL_STATE: Cart = {
  isLoading: false,
  data: [],
  error: null,
};

export const postCartSuccess = (cartListState: Cart, action: any) => {
  return {
    isLoading: false,
    data: (cartListState.data as CartType[]).concat(action.payload),
    error: null,
  };
};

export const cartReducer = createReducer<Cart>(INITIAL_STATE, {
  [POST_CART_SUCCESS]: postCartSuccess,
});
