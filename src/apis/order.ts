import axios from 'axios';
import { STATUS_CODE, URL } from '../constants';
import { CartItem, OrderData } from '../type';

interface addOrderRequestInfo {
  cart_id: number;
  quantity: number;
}

export const requestAddOrder = async (cartItems: CartItem[]) => {
  const requestBody: addOrderRequestInfo[] = cartItems.map(cartItem => ({
    cart_id: Number(cartItem.id),
    quantity: Number(cartItem.quantity),
  }));

  const response = await axios.post(URL.ORDERS, requestBody);

  if (response.status !== STATUS_CODE.POST_SUCCESS) {
    throw { status: response.status };
  }
};

export const requestGetOrders = async () => {
  const response = await axios.get<OrderData[]>(URL.ORDERS);
  if (response.status !== STATUS_CODE.GET_SUCCESS) {
    throw { status: response.status };
  }

  return response;
};

export const requestGetOrder = async (orderId: string) => {
  const response = await axios.get<OrderData>(`${URL.ORDERS}/${orderId}`);
  if (response.status !== STATUS_CODE.GET_SUCCESS) {
    throw { status: response.status };
  }

  return response;
};
