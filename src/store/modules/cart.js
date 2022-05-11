const ADD_CART = 'ADD_CART';
const DELETE_CART = 'DELETE_CART';
const EDIT_CART = 'EDIT_CART';

const initialState = {
  cart: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CART: {
      return {
        cart: [...state.cart, action.payload],
      };
    }
    case DELETE_CART: {
      return {};
    }
    case EDIT_CART: {
      const {id, count} = action.payload;

      const newState = state.map((item) => {
        if (item.id === id) {
          return {...item, count: count};
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

export {ADD_CART, DELETE_CART, EDIT_CART};
