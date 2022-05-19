export const SELECTED_ITEM = {
  ADD: 'ADD',
  DELETE: 'DELETE',
  ADD_ALL: 'ADD_ALL',
  DELETE_ALL: 'DELETE_ALL',
};

const INITIAL_STATE = {
  selectedItem: [],
};

Object.freeze(INITIAL_STATE);
Object.freeze(INITIAL_STATE.selectedItem);

export default function selectedItemReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECTED_ITEM.ADD: {
      const id = action.payload;

      return {
        selectedItem: [...state.selectedItem, id],
      };
    }
    case SELECTED_ITEM.DELETE: {
      const newState = state.selectedItem.filter((id) => id !== action.payload);

      return {
        selectedItem: newState,
      };
    }

    case SELECTED_ITEM.ADD_ALL: {
      const cart = action.payload;
      const newState = cart.map(({id}) => id);
      return {
        selectedItem: newState,
      };
    }

    case SELECTED_ITEM.DELETE_ALL: {
      return {
        selectedItem: [],
      };
    }

    default:
      return state;
  }
}
