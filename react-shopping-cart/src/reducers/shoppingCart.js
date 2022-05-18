import { ADD_ITEM, DELETE_ITEM } from 'actions';

const INITIAL_STATE = {
  shoppingCartList: [],
};

function shoppingCartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        shoppingCartList: [...state.shoppingCartList, { ...action.payload, quantity: 1 }],
      };

    case DELETE_ITEM:
      return {
        ...state,
        shoppingCartList: state.shoppingCartList.filter(
          product => product.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
}

export default shoppingCartReducer;
