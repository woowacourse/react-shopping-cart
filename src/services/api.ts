import axios from 'axios';
import { STATUS_CODE, URL, RESPONSE_RESULT } from '../constants';

export const API = {
  ORDER: async (orderItems: CartItem[]) => {
    try {
      const data = orderItems.map(item => ({ cartId: item.cartId, quantity: item.quantity }));
      const response = await axios.post(URL.ORDERS, data);

      if (response.status !== STATUS_CODE.POST_SUCCESS) {
        return RESPONSE_RESULT.FAILURE;
      }

      return RESPONSE_RESULT.SUCCESS;
    } catch (error) {
      return RESPONSE_RESULT.FAILURE;
    }
  },
};
