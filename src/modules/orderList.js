import { API_PATH } from '../constants/api';
import { httpClient } from '../request/httpClient';
import { createAsyncThunk } from './utils/async';
import { reducerUtils } from './utils/reducer';
import { requestGetItemList } from './utils/request';

const GET_ORDER_ITEM_LIST = 'orderList/GET_ORDER_ITEM_LIST';
const GET_ORDER_ITEM_LIST_SUCCESS = 'orderList/GET_ORDER_ITEM_LIST_SUCCESS';
const GET_ORDER_ITEM_LIST_FAILURE = 'orderList/GET_ORDER_ITEM_LIST_FAILURE';

const INSERT_ORDER_ITEM_LIST = 'orderList/INSERT_ORDER_ITEM_LIST';
const INSERT_ORDER_ITEM_LIST_SUCCESS = 'orderList/INSERT_ORDER_ITEM_LIST_SUCCESS';
const INSERT_ORDER_ITEM_LIST_FAILURE = 'orderList/INSERT_ORDER_ITEM_LIST_FAILURE';

export const getOrderItemList = createAsyncThunk(
  GET_ORDER_ITEM_LIST,
  requestGetItemList.bind(null, API_PATH.ORDER_ITEM_LIST)
);

export const insertOrderItemList = (orderItemList) => async (dispatch) => {
  dispatch({ type: INSERT_ORDER_ITEM_LIST });
  try {
    const orderItemData = { orderNumber: new Date().getTime(), itemList: orderItemList };

    await httpClient.post({ path: API_PATH.ORDER_ITEM_LIST, body: orderItemData });

    dispatch({ type: INSERT_ORDER_ITEM_LIST_SUCCESS, payload: orderItemData });
  } catch (error) {
    console.error(error);
    dispatch({ type: INSERT_ORDER_ITEM_LIST_FAILURE, payload: error });
  }
};

const initialState = {
  orderItemList: reducerUtils.initial([]),
};

const orderList = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_ITEM_LIST:
      return {
        ...state,
        orderItemList: reducerUtils.loading([]),
      };
    case GET_ORDER_ITEM_LIST_SUCCESS:
      return {
        ...state,
        orderItemList: reducerUtils.success(action.payload.reverse()),
      };
    case GET_ORDER_ITEM_LIST_FAILURE:
      return {
        ...state,
        orderItemList: reducerUtils.failure([], action.payload),
      };

    case INSERT_ORDER_ITEM_LIST:
      return {
        ...state,
        orderItemList: reducerUtils.loading(state.orderItemList.data),
      };
    case INSERT_ORDER_ITEM_LIST_SUCCESS:
      return {
        ...state,
        orderItemList: reducerUtils.success([action.payload, ...state.orderItemList.data]),
      };
    case INSERT_ORDER_ITEM_LIST_FAILURE:
      return {
        ...state,
        orderItemList: reducerUtils.failure(state.orderItemList.data, action.payload),
      };

    default:
      return state;
  }
};

export default orderList;
