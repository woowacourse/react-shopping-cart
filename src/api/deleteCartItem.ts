import { API_END_POINTS } from '../constants/apiEndPoint';
import { httpClient } from './httpClient';

export const deleteCartItem = async (cartItemId: number) => {
  const res = await httpClient.delete(`${API_END_POINTS.CART_ITEMS}/${cartItemId}`);

  if (!res.ok) {
    throw new Error('장바구니에서 상품을 삭제하는 데 실패했습니다.');
  }

  return res;
};
