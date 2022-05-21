import {
  ADD_SHOPPING_BASKET_PRODUCT,
  DELETE_SHOPPING_BASKET_PRODUCT,
  INCREASE_SHOPPING_BASKET_PRODUCT,
  DECREASE_SHOPPING_BASKET_PRODUCT,
} from 'actions/shoppingBasket';

const INITIAL_STATE = {
  shoppingBasketList: [],
};

function shoppingBasketReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_SHOPPING_BASKET_PRODUCT:
      return {
        ...state,
        shoppingBasketList: [...state.shoppingBasketList, { ...action.payload, quantity: 1 }],
      };

    case DELETE_SHOPPING_BASKET_PRODUCT:
      return {
        ...state,
        shoppingBasketList: state.shoppingBasketList.filter(
          product => !action.payload.idList.includes(product.id)
        ),
      };

    case INCREASE_SHOPPING_BASKET_PRODUCT:
      return {
        ...state,
        shoppingBasketList: state.shoppingBasketList.map(product => {
          if (product.id === action.payload.id) {
            product.quantity += 1;
          }

          return product;
        }),
      };

    case DECREASE_SHOPPING_BASKET_PRODUCT:
      return {
        ...state,
        shoppingBasketList: state.shoppingBasketList.map(product => {
          if (product.id === action.payload.id && product.quantity > 0) {
            product.quantity -= 1;
          }

          return product;
        }),
      };

    default:
      return state;
  }
}

export default shoppingBasketReducer;
