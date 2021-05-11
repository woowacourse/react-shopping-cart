import produce from 'immer';
import { combineReducers } from 'redux';
// import { requestTable } from '../api/request';
// import { SCHEMA } from '../constants';
import { GET_MY_SHOPPING_CART, UPDATE_MY_SHOPPING_CART_ITEMS } from './actionType';

const initialState = {
  myShoppingCart: { id: null, productIdList: [] },
};

const myShoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MY_SHOPPING_CART_ITEMS: {
      return produce(state, draft => {
        draft.myShoppingCart.productIdList = action.productIdList;
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
