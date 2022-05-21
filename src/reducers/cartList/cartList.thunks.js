import * as actions from 'reducers/cartList/cartList.actions';
import apiClient from 'utils/apiClient';

export const getCartListAsync = async (dispatch) => {
  dispatch(actions.getCartList());

  try {
    const { data } = await apiClient.get('/cartList');
    dispatch(actions.getCartListSuccess(data));
  } catch (error) {
    dispatch(actions.getCartListError());
  }
};
