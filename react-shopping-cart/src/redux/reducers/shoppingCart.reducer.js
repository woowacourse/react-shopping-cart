import {
  ADD_ITEM,
  DELETE_ITEM,
  DELETE_ITEM_LIST,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from 'redux/actions/shoppingCart.action';

const initialState = [];

function shoppingCart(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, { ...action.payload, quantity: 1 }];

    case DELETE_ITEM:
      return state.filter(product => product.id !== action.payload.id);

    case DELETE_ITEM_LIST:
      return state.filter(product => !action.payload.includes(product.id));

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
      const currentQuantity = currentState['quantity'] === 1 ? 1 : currentState['quantity'] - 1;
      newState[index] = { ...currentState, quantity: currentQuantity };

      return newState;
    }
    default:
      return state;
  }
}

export default shoppingCart;
