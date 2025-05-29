import { URLS } from '../constants/url';

export const deleteCartItem = async (cartItemId: number | undefined) => {
  if (cartItemId === undefined) {
    throw new Error('cartItemId가 정의되지 않았습니다.');
  }
  const res = await fetch(`${URLS.CART_ITEMS}/${cartItemId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${btoa(`${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`)}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('장바구니에서 상품을 삭제하는 데 실패했습니다.');
  }

  return res;
};
