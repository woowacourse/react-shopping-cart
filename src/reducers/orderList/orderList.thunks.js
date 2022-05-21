import * as actions from 'reducers/orderList/orderList.actions';
import apiClient from 'utils/apiClient';

export const getOrderListAsync = async (dispatch) => {
  dispatch(actions.getOrderList());

  try {
    const { data } = await apiClient.get('/orderList');
    console.log('getOrderListAsync', data);
    dispatch(actions.getOrderListSuccess(data));
  } catch (error) {
    dispatch(actions.getOrderListError());
  }
};
