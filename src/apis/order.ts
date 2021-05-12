import axios from 'axios';
import { STATUS_CODE, URL } from '../constants';

export const requestOrderAdd = async (orderItems: CartItem[]) => {
  let response = await axios.post(URL.ORDERS, { orderItems });
  if (response.status !== STATUS_CODE.POST_SUCCESS) {
    throw { status: response.status };
  }
};
