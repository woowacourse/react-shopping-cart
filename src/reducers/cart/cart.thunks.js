import * as actions from 'reducers/cart/cart.actions';
import apiClient from 'utils/apiClient';

export const addCartAsync = (id) => async (dispatch) => {
  dispatch(actions.addCart());

  try {
    await apiClient.post('/cart', { id, cartQuantity: 1 });

    const { data } = await apiClient.get('/cart');
    dispatch(actions.getCartSuccess(data));
  } catch (error) {
    dispatch(actions.getCartError());
  }
};
