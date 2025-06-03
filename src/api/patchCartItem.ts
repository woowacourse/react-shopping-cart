import { URLS } from '../constants/url';
import { headers } from './headers';

export const patchCartItem = async (cartItemId: number | undefined, quantity: number) => {
  if (cartItemId === undefined) {
    throw new Error('cartItemId가 정의되지 않았습니다.');
  }
  const result = await fetch(`${URLS.CART_ITEMS}/${cartItemId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      quantity
    })
  });

  if (!result.ok) {
    throw new Error('상품 수량을 수정하는 데 실패했습니다.');
  }
};
