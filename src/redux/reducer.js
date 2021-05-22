import produce from 'immer';
import { combineReducers } from 'redux';
import {
  ADD_SHOPPING_CART_ITEM,
  DELETE_SHOPPING_CART_ITEM,
  DELETE_SHOPPING_CART_ITEMS,
  GET_MY_SHOPPING_CART,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
} from './actionType';

const initialState = {
  myShoppingCart: [],
};

const myShoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SHOPPING_CART_ITEM: {
      return produce(state, draft => {
        draft.myShoppingCart = [...draft.myShoppingCart, { ...action.newItem, amount: 1 }];
      });
    }
    case DELETE_SHOPPING_CART_ITEM: {
      return produce(state, draft => {
        draft.myShoppingCart = draft.myShoppingCart.filter(item => item.cart_id !== action.targetCartId);
      });
    }
    case DELETE_SHOPPING_CART_ITEMS: {
      return produce(state, draft => {
        draft.myShoppingCart.productIdList = draft.myShoppingCart.productIdList.filter(
          productId => !action.checkedIdList.includes(productId)
        );
      });
    }
    case GET_MY_SHOPPING_CART: {
      return produce(state, draft => {
        draft.myShoppingCart = action.myShoppingCart.map(product => ({ ...product, amount: 1, isChecked: true }));
      });
    }
    case INCREASE_AMOUNT: {
      return produce(state, draft => {
        const targetItem = draft.myShoppingCart.find(item => item.product_id === action.targetId);
        targetItem.amount += 1;
      });
    }
    case DECREASE_AMOUNT: {
      return produce(state, draft => {
        const targetItem = draft.myShoppingCart.find(item => item.product_id === action.targetId);
        targetItem.amount -= 1;
      });
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({ myShoppingCartReducer });

export default rootReducer;
