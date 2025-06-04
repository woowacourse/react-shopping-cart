import { URLS } from '../constants/url';
import { httpClient } from './httpClient';

export const deleteCartItem = async (cartItemId: number | undefined) => {
  if (cartItemId === undefined) {
    throw new Error('cartItemId가 정의되지 않았습니다.');
  }

  const res = await httpClient.delete(`${URLS.CART_ITEMS}/${cartItemId}`);

  if (!res.ok) {
    throw new Error('장바구니에서 상품을 삭제하는 데 실패했습니다.');
  }

  return res;
};
