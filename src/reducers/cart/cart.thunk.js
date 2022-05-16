import * as actions from 'reducers/cart/cart.actions';
import apiClient from 'utils/apiClient';

export const addCartItemAsync = (id) => async (dispatch) => {
  dispatch(actions.addCartItem());

  try {
    await apiClient.post(`/cart/${id}`);
    dispatch(actions.addCartItemSuccess());
  } catch (error) {
    dispatch(actions.addCartItemError());
  }
};
