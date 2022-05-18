import * as actions from 'reducers/cart/cart.actions';
import apiClient from 'utils/apiClient';

export const getCartAsync = async (dispatch) => {
  dispatch(actions.getCart());

  try {
    const { data } = await apiClient.get('/cartList');
    dispatch(actions.getCartSuccess(data));
  } catch (error) {
    dispatch(actions.getCartError());
  }
};
