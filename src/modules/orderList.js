import { httpClient } from '../request/httpClient';

const INSERT_ORDER_ITEM_LIST = 'orderList/INSERT_ORDER_ITEM_LIST';

export const insertOrderItemList = (orderItemList) => async (dispatch) => {
  try {
    await httpClient.post({ path: 'orderItemList', body: orderItemList });

    dispatch({ type: INSERT_ORDER_ITEM_LIST, payload: orderItemList });
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  orderItemList: [],
};

const orderList = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_ORDER_ITEM_LIST:
      return {
        ...state,
        orderItemList: [
          {
            orderNumber: new Date().getTime(),
            itemList: action.payload,
          },
          ...state.orderItemList,
        ],
      };
    default:
      return state;
  }
};

export default orderList;
