import { ADD_ITEM, DELETE_ITEM } from 'actions';

const initialState = [];

function shoppingCart(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        {
          ...action.payload,
          quantity: 1,
        },
      ];
    case DELETE_ITEM:
      return state.filter(product => product.id !== action.payload.id);

    default:
      return state;
  }
}

export default shoppingCart;
