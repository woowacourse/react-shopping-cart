import { createPromiseThunk } from 'utils/createPromiseThunk';
import { GET_ORDER_LIST } from 'reducers/orderList/orderList.reducer';
import { getOrderListFromApi } from 'api/get';

export const getOrderListAsync = createPromiseThunk(
  GET_ORDER_LIST,
  getOrderListFromApi,
);
