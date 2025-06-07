import { Action, CART_ACTION_TYPES } from "../types/cartAction";
import { State } from "../types/cartState";
import { CartItemWithSelection } from "../types/response";

const cartReducer = (state: State, action: Action): State => {
  const calculateAllSelected = (items: CartItemWithSelection[]) =>
    items.length > 0 && items.every((item) => item.selected);

  switch (action.type) {
    case CART_ACTION_TYPES.REPLACE_ITEMS:
      return {
        items: action.items,
        allSelected: calculateAllSelected(action.items),
      };

    case CART_ACTION_TYPES.TOGGLE_ALL_SELECTED: {
      const newSelected = !state.allSelected;
      return {
        items: state.items.map((i) => ({ ...i, selected: newSelected })),
        allSelected: newSelected,
      };
    }

    case CART_ACTION_TYPES.TOGGLE_ITEM_SELECTED: {
      const newItems = state.items.map((i) =>
        i.id === action.id ? { ...i, selected: !i.selected } : i
      );
      return {
        items: newItems,
        allSelected: calculateAllSelected(newItems),
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
