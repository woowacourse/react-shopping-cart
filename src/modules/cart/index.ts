import { CartType } from "../../types/cart";
import createReducer from "../createReducer";
import { Cart } from "./type";

const POST_CART_SUCCESS = "cart/POST_CART_SUCCESS" as const;
const PATCH_CART_STOCK = "cart/PATCH_CART_STOCK" as const;
const PATCH_CART_CHECK = "cart/PATCH_CART_CHECK" as const;

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

export const PatchCartStock = (cartListState: Cart, action: any) => {
  const targetCartIndex = cartListState.data.findIndex(
    (cart) => cart.id === action.payload.targetId
  );
  const targetCart = { ...cartListState.data[targetCartIndex] };
  targetCart.stock = action.payload.stockChanged;
  return {
    isLoading: false,
    data: [
      ...cartListState.data.splice(0, targetCartIndex),
      targetCart,
      ...cartListState.data.splice(
        targetCartIndex + 1,
        cartListState.data.length
      ),
    ],
    error: null,
  };
};

export const PatchCartCheck = (cartListState: Cart, action: any) => {
  const targetCartIndex = cartListState.data.findIndex(
    (cart) => cart.id === action.payload.targetId
  );
  const targetCart = { ...cartListState.data[targetCartIndex] };
  targetCart.isChecked = action.payload.isChecked;
  return {
    isLoading: false,
    data: [
      ...cartListState.data.splice(0, targetCartIndex),
      targetCart,
      ...cartListState.data.splice(
        targetCartIndex + 1,
        cartListState.data.length
      ),
    ],
    error: null,
  };
};

export const cartReducer = createReducer<Cart>(INITIAL_STATE, {
  [POST_CART_SUCCESS]: postCartSuccess,
  [PATCH_CART_STOCK]: PatchCartStock,
  [PATCH_CART_CHECK]: PatchCartCheck,
});
