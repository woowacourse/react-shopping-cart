import { ResponseCartItem } from "../types/order";

export type SelectState = {
  id: number;
  selected: boolean;
};

export const initialState: SelectState[] = [];

type ActionType =
  | "ADD_SELECT"
  | "REMOVE_SELECT"
  | "SET_SELECT"
  | "SELECT_ALL"
  | "DESELECT_ALL"
  | "SYNC_WITH_CART";

export interface SelectAction {
  type: ActionType;
  payload: {
    id?: number;
    items?: ResponseCartItem[];
  };
}

export const selectReducer = (state: SelectState[], action: SelectAction) => {
  switch (action.type) {
    case "SET_SELECT":
      return action.payload.items?.length
        ? action.payload.items.map((item) => ({
            id: item.id,
            selected: false,
          }))
        : [];

    case "SYNC_WITH_CART": {
      if (!action.payload.items?.length) {
        return [];
      }

      const cartItemIds = action.payload.items.map((item) => item.id);
      const existingSelections = state.filter((selectItem) =>
        cartItemIds.includes(selectItem.id)
      );

      const newItems = action.payload.items
        .filter(
          (cartItem) =>
            !existingSelections.some(
              (selectItem) => selectItem.id === cartItem.id
            )
        )
        .map((cartItem) => ({
          id: cartItem.id,
          selected: false,
        }));

      return [...existingSelections, ...newItems];
    }

    case "ADD_SELECT":
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, selected: true } : item
      );

    case "REMOVE_SELECT":
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, selected: false } : item
      );

    case "SELECT_ALL":
      return state.map((item) => ({ ...item, selected: true }));

    case "DESELECT_ALL":
      return state.map((item) => ({ ...item, selected: false }));

    default:
      return state;
  }
};
