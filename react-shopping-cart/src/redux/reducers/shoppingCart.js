import { ADD_ITEM, DELETE_ITEM, INCREASE_QUANTITY, DECREASE_QUANTITY } from 'redux/actions';

const initialState = [];

function shoppingCart(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, { ...action.payload, quantity: 1 }];

    case DELETE_ITEM:
      return state.filter(product => product.id !== action.payload.id);

    case INCREASE_QUANTITY: {
      const newState = [...state];

      const currentState = newState.find(product => product.id === Number(action.payload.id));
      const index = newState.findIndex(product => product.id === Number(action.payload.id));
      newState[index] = { ...currentState, quantity: currentState['quantity'] + 1 };

      return newState;
    }

    case DECREASE_QUANTITY: {
      const newState = [...state];

      const currentState = newState.find(product => product.id === Number(action.payload.id));
      const index = newState.findIndex(product => product.id === Number(action.payload.id));
      const currentQuantity = currentState['quantity'] === 0 ? 0 : currentState['quantity'] - 1;
      newState[index] = { ...currentState, quantity: currentQuantity };

      return newState;
    }
    default:
      return state;
  }
}

export default shoppingCart;
