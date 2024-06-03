import { fetchWithPayload } from './fetch';

import { BASE_URL } from '.';
import MESSAGE from '../constants/Message';

export const fetchPostingOrders = async (cartItemIds: number[]) => {
  try {
    await fetchWithPayload({
      url: `${BASE_URL}/orders`,
      method: 'POST',
      payload: { cartItemIds },
      errorMessage: MESSAGE.error.postingOrders,
    });
  } catch (error) {
    console.error(error);
  }
};
