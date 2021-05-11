import { API_PATH } from '../constants/api';
import { createAsyncThunk } from './utils/async';
import { reducerUtils } from './utils/reducer';
import { requestGetItemList } from './utils/request';

const GET_PRODUCT_ITEM_LIST = 'product/GET_PRODUCT_ITEM_LIST';
const GET_PRODUCT_ITEM_LIST_SUCCESS = 'product/GET_PRODUCT_ITEM_LIST_SUCCESS';
const GET_PRODUCT_ITEM_LIST_FAILURE = 'product/GET_PRODUCT_ITEM_LIST_FAILURE';

export const fetchProductList = createAsyncThunk(
  GET_PRODUCT_ITEM_LIST,
  requestGetItemList.bind(null, API_PATH.PRODUCT_LIST)
);

const initialState = {
  productList: reducerUtils.initial([]),
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_ITEM_LIST:
      return {
        ...state,
        productList: reducerUtils.loading([]),
      };
    case GET_PRODUCT_ITEM_LIST_SUCCESS:
      return {
        ...state,
        productList: reducerUtils.success(action.payload),
      };
    case GET_PRODUCT_ITEM_LIST_FAILURE:
      return {
        ...state,
        productList: reducerUtils.failure([], action.payload),
      };
    default:
      return state;
  }
};

export default product;
