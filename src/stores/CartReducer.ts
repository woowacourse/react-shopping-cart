import { ResponseCartItem } from "../types/types";

export const initialState = [];

type ActionType =
  | "REMOVE_ITEM"
  | "INCREASE_ITEM_QUANTITY"
  | "DECREASE_ITEM_QUANTITY"
  | "SET_CART";

export interface CartAction {
  type: ActionType;
  payload: {
    id?: number;
    quantity?: number;
    items?: ResponseCartItem[];
  };
}

export const cartReducer = (state: ResponseCartItem[], action: CartAction) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload.items || [];
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);
    case "INCREASE_ITEM_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity || item.quantity + 1 }
          : item
      );
    case "DECREASE_ITEM_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity:
                action.payload.quantity || Math.max(1, item.quantity - 1),
            }
          : item
      );
    default:
      return state;
  }
};
