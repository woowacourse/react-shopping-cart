import * as actions from 'reducers/productList/productList.actions';
import apiClient from 'utils/apiClient';

export const getProductListAsync = async (dispatch) => {
  dispatch(actions.getProductList());

  try {
    const { data } = await apiClient.get('/productList');
    dispatch(actions.getProductListSuccess(data));
  } catch (error) {
    dispatch(actions.getProductListError());
  }
};
