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
    throw Error('상품 주문에 실패하였습니다.');
  }
};

export const requestGetOrders = async () => {
  const response = await axios.get<OrderData[]>(URL.ORDERS);
  if (response.status !== STATUS_CODE.GET_SUCCESS) {
    throw Error('주문 목록들을 조회하는데 실패하였습니다.');
  }

  return response;
};

export const requestGetOrder = async (orderId: string) => {
  const response = await axios.get<OrderData>(`${URL.ORDERS}/${orderId}`);
  if (response.status !== STATUS_CODE.GET_SUCCESS) {
    throw Error('주문 정보를 조회하는데 실패하였습니다.');
  }

  return response;
};
