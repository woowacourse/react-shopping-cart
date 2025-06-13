import { API_END_POINTS } from '../constants/apiEndPoint';
import { CartItemResponse } from '../types/response';
import { httpClient } from './httpClient';

const getCartItems = async (): Promise<CartItemResponse> => {
  console.log(API_END_POINTS.CART_ITEMS);
  const res = await httpClient.get(API_END_POINTS.CART_ITEMS);

  if (!res.ok) {
    throw new Error('장바구니 데이터를 불러오는 데 실패했습니다.');
  }

  return res.json();
};

export default getCartItems;
