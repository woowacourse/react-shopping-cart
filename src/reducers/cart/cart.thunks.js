import actions from 'reducers/cart/cart.actions';
import apiClient from 'utils/apiClient';

export const getCartAsync = (id) => async (dispatch) => {
  dispatch(actions.getCart());
  try {
    const { data } = await apiClient().get(`users/${id}`);
    console.log(data.cartProducts);
    dispatch(actions.getCartSuccess(data.cartProducts));
  } catch (error) {
    dispatch(actions.getCartError());
  }
};
