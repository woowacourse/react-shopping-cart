import { httpClient } from '../request/httpClient';

const FETCH_ORDER_ITEM_LIST = 'orderList/FETCH_ORDER_ITEM_LIST';
const INSERT_ORDER_ITEM_LIST = 'orderList/INSERT_ORDER_ITEM_LIST';

export const insertOrderItemList = (orderItemList) => async (dispatch) => {
  try {
    const orderItemData = { orderNumber: new Date().getTime(), itemList: orderItemList };

    await httpClient.post({ path: 'orderItemList', body: orderItemData });

    dispatch({ type: INSERT_ORDER_ITEM_LIST, payload: orderItemData });
  } catch (error) {
    console.error(error);
  }
};

export const fetchOrderItemList = () => async (dispatch) => {
  try {
    const orderItemList = await httpClient.get({ path: 'orderItemList', returnType: 'json' });

    dispatch({ type: FETCH_ORDER_ITEM_LIST, payload: orderItemList });
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  orderItemList: [],
};

const orderList = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_ITEM_LIST:
      return {
        ...state,
        orderItemList: action.payload,
      };
    case INSERT_ORDER_ITEM_LIST:
      return {
        ...state,
        orderItemList: [action.payload, ...state.orderItemList],
      };

    default:
      return state;
  }
};

export default orderList;
