import { CartItemWithSelection } from "./response";

export interface State {
  items: CartItemWithSelection[];
  allSelected: boolean;
}

export type Action =
  | { type: "REPLACE_ITEMS"; items: CartItemWithSelection[] }
  | { type: "TOGGLE_ALL_SELECTED" }
  | { type: "TOGGLE_ITEM_SELECTED"; id: number };
