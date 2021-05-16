import { ACTION_TYPE } from '../constants';

const initialState = {
  orderList: [],
};

export const addOrderDetail = data => {
  return {
    type: ACTION_TYPE.ADD_ORDER_DETAIL,
    payload: data,
  };
};

export const orderListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_ORDER_DETAIL:
      return {
        ...state,
        orderList: state.orderList.concat(action.payload),
      };

    default:
      return state;
  }
};