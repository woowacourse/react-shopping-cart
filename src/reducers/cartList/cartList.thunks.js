import { API_PATH } from 'constants/path';
import * as actions from 'reducers/cartList/cartList.actions';
import apiClient from 'utils/apiClient';

export const getCartListAsync = async (dispatch) => {
  dispatch(actions.getCartList());

  try {
    const { data } = await apiClient.get(API_PATH.CART_LIST);
    dispatch(actions.getCartListSuccess(data));
  } catch (error) {
    dispatch(actions.getCartListError());
  }
};
