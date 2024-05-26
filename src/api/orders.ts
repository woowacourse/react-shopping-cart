import { BASE_URL } from '.';
import MESSAGE from '../constants/Message';
import { fetchWithPayload } from './fetch';

const fetchPostOrders = async (cartItemIds: number[]) => {
  await fetchWithPayload({
    url: `${BASE_URL}/orders`,
    method: 'POST',
    payload: { cartItemIds },
    errorMessage: MESSAGE.error.postingOrders,
  });
};

export default fetchPostOrders;
