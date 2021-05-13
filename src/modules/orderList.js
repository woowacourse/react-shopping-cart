import { API_PATH } from '../constants/api';
import { requestGetItemList, requestInsertItem } from '../request/request';
import { createAsyncThunk } from './utils/async';
import { reducerUtils } from './utils/reducer';

const GET_ORDER_ITEM_LIST = 'orderList/GET_ORDER_ITEM_LIST';
const GET_ORDER_ITEM_LIST_SUCCESS = 'orderList/GET_ORDER_ITEM_LIST_SUCCESS';
const GET_ORDER_ITEM_LIST_FAILURE = 'orderList/GET_ORDER_ITEM_LIST_FAILURE';

const INSERT_ORDER_ITEM_LIST = 'orderList/INSERT_ORDER_ITEM_LIST';
const INSERT_ORDER_ITEM_LIST_SUCCESS = 'orderList/INSERT_ORDER_ITEM_LIST_SUCCESS';
const INSERT_ORDER_ITEM_LIST_FAILURE = 'orderList/INSERT_ORDER_ITEM_LIST_FAILURE';

export const getOrderItemList = createAsyncThunk(GET_ORDER_ITEM_LIST, () =>
  requestGetItemList(API_PATH.ORDER_ITEM_LIST)
);

export const insertOrderItemList = createAsyncThunk(INSERT_ORDER_ITEM_LIST, (item) =>
  requestInsertItem(API_PATH.ORDER_ITEM_LIST, item)
);

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
