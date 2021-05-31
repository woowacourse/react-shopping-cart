import axios from 'axios';

export const fetchCompletedOrder = () => async dispatch => {
  try {
    const response = await axios.get('/api/customers/ddongule/orders');
    console.log(response.data);
    dispatch({ type: 'SET_COMPLETED_ORDERS', payload: response.data });
  } catch (error) {
    console.error(error.message);
  }
};
