import { API_PATH } from 'constants/path';
import * as actions from 'reducers/productList/productList.actions';
import apiClient from 'utils/apiClient';

export const getProductListAsync = async (dispatch) => {
  dispatch(actions.getProductList());

  try {
    const { data } = await apiClient.get(API_PATH.PRODUCT_LIST);
    dispatch(actions.getProductListSuccess(data));
  } catch (error) {
    dispatch(actions.getProductListError());
  }
};
