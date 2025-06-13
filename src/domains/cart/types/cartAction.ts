import { CartItemWithSelection } from "./response";

export const CART_ACTION_TYPES = {
  REPLACE_ITEMS: "REPLACE_ITEMS",
  TOGGLE_ALL_SELECTED: "TOGGLE_ALL_SELECTED",
  TOGGLE_ITEM_SELECTED: "TOGGLE_ITEM_SELECTED",
} as const;

export type Action =
  | {
      type: typeof CART_ACTION_TYPES.REPLACE_ITEMS;
      items: CartItemWithSelection[];
    }
  | { type: typeof CART_ACTION_TYPES.TOGGLE_ALL_SELECTED }
  | { type: typeof CART_ACTION_TYPES.TOGGLE_ITEM_SELECTED; id: number };
