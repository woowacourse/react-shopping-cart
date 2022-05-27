import { getProductListFromApi } from 'api/get';
import { createPromiseThunk } from 'utils/createPromiseThunk';
import { GET_PRODUCT_LIST } from './productList.reducer';

export const getProductListAsync = createPromiseThunk(
  GET_PRODUCT_LIST,
  getProductListFromApi,
);
