import { ACTION_TYPE } from '../constants';
import { getId } from '../utils';

const initialState = {
  totalOrders: {},
};

const addToOrderList = (state, products) => {
  const { totalOrders } = state;
  const id = getId();

  return {
    ...state,
    totalOrders: { ...totalOrders, [id]: products },
  };
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.ORDER.ADD_TO_ORDER_LIST:
      return addToOrderList(state, action.products);

    default:
      return state;
  }
};

export default orderReducer;
