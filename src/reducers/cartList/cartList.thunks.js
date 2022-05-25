import { getCartListFromApi } from 'api/get';
import { createPromiseThunk } from 'utils/createPromiseThunk';
import { GET_CART_LIST } from './cartList.reducer';

export const getCartListAsync = createPromiseThunk(
  GET_CART_LIST,
  getCartListFromApi,
);
