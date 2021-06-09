import produce from 'immer';
import { combineReducers } from 'redux';
import { ACTION_TYPE } from '../constants';

const initialState = {
  orderedItems: [],
};

const setCompletedOrder = (state, payload) => {
  const updater = produce(draft => {
    draft.orderedItems = payload.sort((a, b) => b.order_id - a.order_id);
  });

  return updater(state);
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.ORDERS.SET_COMPLETED_ORDERS:
      return setCompletedOrder(state, action.payload);

    default:
      return state;
  }
};

export default combineReducers({ order: orderReducer });
