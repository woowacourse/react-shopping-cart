import produce from 'immer';
import { combineReducers } from 'redux';
import { requestTable } from '../api/request';
import { SCHEMA } from '../constants';
import { ADD_ITEM, DELETE_ITEMS, GET_MY_SHOPPING_CART } from './actionType';

const initialState = {
  myShoppingCart: { id: null, productIdList: [] },
};

const updateShoppingCartItemsAsync = async (schema, targetId, content) => {
  try {
    await requestTable.PUT(schema, targetId, content);
  } catch (error) {
    console.error(error);
  }
};

const myShoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const newState = produce(state, draft => {
        const { myShoppingCart } = draft;

        if (!draft.myShoppingCart.productIdList.includes(action.productId)) {
          myShoppingCart.productIdList = [...draft.myShoppingCart.productIdList, action.productId];
        }
      });

      updateShoppingCartItemsAsync(SCHEMA.SHOPPING_CART, newState.myShoppingCart.id, {
        productIdList: newState.myShoppingCart.productIdList,
      });

      return newState;
    }
    case DELETE_ITEMS: {
      const newState = produce(state, draft => {
        const { myShoppingCart } = draft;

        myShoppingCart.productIdList = draft.myShoppingCart.productIdList.filter(
          productId => !action.productIds.includes(productId)
        );
      });

      updateShoppingCartItemsAsync(SCHEMA.SHOPPING_CART, newState.myShoppingCart.id, {
        productIdList: newState.myShoppingCart.productIdList,
      });

      return newState;
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
