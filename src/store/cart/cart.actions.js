import axios from 'axios';

const actionTypes = {
  ADD_CART: 'ADD_CART',
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

export { addCartItemAsync, actionTypes };
