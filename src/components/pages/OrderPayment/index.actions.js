import axios from 'axios';

export const postOrders = async (orderItems, dispatch) => {
  try {
    await axios.post('/api/customers/ddongule/orders', orderItems);
    dispatch({ type: 'RESET_CARTS' });
  } catch (error) {
    console.error(error);
  }
};
