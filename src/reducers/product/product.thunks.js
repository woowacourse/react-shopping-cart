import { getProductFromApi } from 'api/get';
import { createPromiseThunk } from 'utils/createPromiseThunk';
import { GET_PRODUCT } from './product.reducer';

export const getProductAsync = createPromiseThunk(
  GET_PRODUCT,
  getProductFromApi,
);
