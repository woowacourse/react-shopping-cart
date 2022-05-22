import axios from 'axios';

const actionTypes = {
  ADD_CART: 'ADD_CART',
  DELETE_CART: 'DELETE_CART',
};

const addCartItemAsync = (id) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/cart/${id}`);

    dispatch({
      type: actionTypes.ADD_CART,
      payload: data,
    });
  } catch (error) {
    console.log('error', error);
  }
};

const deleteCartItemAsync = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/cart/${id}`);

    dispatch({
      type: actionTypes.DELETE_CART,
      payload: data,
    });
  } catch (error) {
    console.log('error', error);
  }
};

export { addCartItemAsync, deleteCartItemAsync, actionTypes };
