import { URLS } from '../constants/url';
import { headers } from './headers';

export const deleteCartItem = async (cartItemId: number | undefined) => {
  if (cartItemId === undefined) {
    throw new Error('cartItemId가 정의되지 않았습니다.');
  }

  const res = await fetch(`${URLS.CART_ITEMS}/${cartItemId}`, {
    method: 'DELETE',
    headers
  });

  if (!res.ok) {
    throw new Error('장바구니에서 상품을 삭제하는 데 실패했습니다.');
  }
};
