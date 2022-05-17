const ACTION = {
  ADD_CART: 'ADD_CART',
  DELETE_CART: 'DELETE_CART',
  EDIT_CART: 'EDIT_CART',
};

const initialState = {
  cart: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.ADD_CART: {
      return {
        cart: [...state.cart, action.payload],
      };
    }
    case ACTION.DELETE_CART: {
      const id = action.payload;
      const newState = state.cart.filter((item) => item.id !== id);

      return {...state, cart: newState};
    }
    case ACTION.EDIT_CART: {
      const {id, count} = action.payload;

      const newState = state.map((item) => {
        if (item.id === id) {
          return {...item, count};
        }

        return item;
      });

      return {
        ...state,
        cart: newState,
      };
    }

    default:
      return state;
  }
}

export {ACTION};
