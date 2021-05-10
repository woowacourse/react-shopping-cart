import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ACTION_TYPE } from '../constants';
import { cartReducer } from './cartReducer';

const initialState = {
  itemList: [],
  orderList: [],
};

export const setItemList = data => {
  return {
    type: ACTION_TYPE.SET_ITEM_LIST,
    payload: data,
  };
};

export const addOrderDetail = data => {
  return {
    type: ACTION_TYPE.ADD_ORDER_DETAIL,
    payload: data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_ITEM_LIST:
      return {
        ...state,
        itemList: action.payload,
      };
    case ACTION_TYPE.ADD_ORDER_DETAIL:
      return {
        ...state,
        orderList: state.orderList.concat(action.payload),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ cartReducer, reducer });

export const store = createStore(rootReducer, composeWithDevTools());
