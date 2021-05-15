import produce from 'immer';
import { combineReducers } from 'redux';
import {
  ADD_SHOPPING_CART_ITEM,
  DELETE_SHOPPING_CART_ITEM,
  DELETE_SHOPPING_CART_ITEMS,
  GET_MY_SHOPPING_CART,
} from './actionType';

const initialState = {
  myShoppingCart: { id: null, productIdList: [] },
};

const myShoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SHOPPING_CART_ITEM: {
      return produce(state, draft => {
        draft.myShoppingCart.productIdList = [...new Set([...draft.myShoppingCart.productIdList, action.newProductId])];
      });
    }
    case DELETE_SHOPPING_CART_ITEM: {
      return produce(state, draft => {
        draft.myShoppingCart.productIdList = draft.myShoppingCart.productIdList.filter(
          productId => productId !== action.targetId
        );
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
        draft.myShoppingCart = action.myShoppingCart;
      });
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({ myShoppingCartReducer });

export default rootReducer;
