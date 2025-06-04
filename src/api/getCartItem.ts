import { CartItemResponse } from '../types/response';
import { URLS } from '../constants/url';
import { httpClient } from './httpClient';

const getCartItems = async (): Promise<CartItemResponse> => {
  const res = await httpClient.get(URLS.CART_ITEMS);

  if (!res.ok) {
    throw new Error('장바구니 데이터를 불러오는 데 실패했습니다.');
  }

  return res.json();
};

export default getCartItems;
