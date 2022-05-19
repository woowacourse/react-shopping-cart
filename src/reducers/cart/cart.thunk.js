import * as actions from 'reducers/cart/cart.actions';
import apiClient from 'utils/apiClient';

export const getCartItemAsync = async (dispatch) => {
  dispatch(actions.getCartRequest());
  try {
    const { data } = await apiClient.get('/cart');
    dispatch(actions.getCartSuccess(data));
  } catch (error) {
    dispatch(actions.getCartError());
  }
};

export const addCartItemAsync = (id) => async (dispatch) => {
  dispatch(actions.addCartItemRequest());
  try {
    const { data } = await apiClient.post(`/cart/${id}`);
    dispatch(actions.addCartItemSuccess(data));
  } catch (error) {
    dispatch(actions.addCartItemError());
  }
};

export const updateCartItemQuantityAsync =
  (id, quantity) => async (dispatch) => {
    dispatch(actions.updateCartItemQuantityRequest());
    try {
      const { data } = await apiClient.put(`/cart/${id}/${quantity}`);
      dispatch(actions.updateCartItemQuantitySuccess(data));
    } catch (error) {
      dispatch(actions.updateCartItemQuantityError());
    }
  };

export const deleteCartItemAsync = (id) => async (dispatch) => {
  dispatch(actions.deleteCartItemRequest());
  try {
    const { data } = await apiClient.delete(`/cart/${id}`);
    dispatch(actions.deleteCartItemSuccess(data));
    dispatch();
  } catch (error) {
    dispatch(actions.deleteCartItemError());
  }
};
