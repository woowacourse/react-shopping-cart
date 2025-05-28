import { CartDataType } from "../types/cartDataType";

export const initialState = [];

type ActionType = "REMOVE_ITEM" | "ADD_ITEM_QUANTITY" | "SUB_ITEM_QUANTITY";

export interface CartAction {
  type: ActionType;
  payload: {
    id: number;
    quantity?: number;
  };
}

export const cartReducer = (state: CartDataType[], action: CartAction) => {
  switch (action.type) {
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);
    case "ADD_ITEM_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case "SUB_ITEM_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    default:
      return state;
  }
};
