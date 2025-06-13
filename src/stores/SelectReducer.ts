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
  | "DESELECT_ALL";

export interface SelectAction {
  type: ActionType;
  payload: {
    id?: number;
    items?: SelectState[];
  };
}

export const selectReducer = (state: SelectState[], action: SelectAction) => {
  switch (action.type) {
    case "SET_SELECT":
      return action.payload.items?.length
        ? action.payload.items.map((item) => ({
            id: item.id,
            selected: item.selected,
          }))
        : [];
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
