import { ADD_ITEM, DELETE_ITEM } from 'actions';

const INITIAL_STATE = {
  shoppingBasketList: [],
};

function shoppingBasketReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        shoppingBasketList: [...state.shoppingBasketList, { ...action.payload, quantity: 1 }],
      };

    case DELETE_ITEM:
      return {
        ...state,
        shoppingBasketList: state.shoppingBasketList.filter(
          product => product.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
}

export default shoppingBasketReducer;
