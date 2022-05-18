import * as actions from 'reducers/products/products.actions';
import apiClient from 'utils/apiClient';

export const getProductsAsync = async (dispatch) => {
  dispatch(actions.getProducts());

  try {
    const { data } = await apiClient.get('/products');
    dispatch(actions.getProductsSuccess(data));
  } catch (error) {
    dispatch(actions.getProductsError());
  }
};
