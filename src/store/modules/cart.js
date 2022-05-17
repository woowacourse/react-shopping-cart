const CART = {
  ADD: 'ADD_CART',
  DELETE: 'DELETE_CART',
  EDIT: 'EDIT_CART',
};

const initialState = {
  cart: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART.ADD: {
      return {
        cart: [...state.cart, action.payload],
      };
    }
    case CART.DELETE: {
      const id = action.payload;
      const newState = state.cart.filter((item) => item.id !== id);

      return {cart: newState};
    }
    case CART.EDIT: {
      const {id, count} = action.payload;

      const newState = state.map((item) => {
        return item.id === id ? {...item, count} : item;
      });

      return {
        cart: newState,
      };
    }

    default:
      return state;
  }
}

export {CART};
