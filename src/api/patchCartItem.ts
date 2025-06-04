import { URLS } from '../constants/url';
import { httpClient } from './httpClient';

const patchCartItem = async (cartItemId: number | undefined, quantity: number) => {
  if (cartItemId === undefined) {
    throw new Error('cartItemId가 정의되지 않았습니다.');
  }

  const result = await httpClient.patch(`${URLS.CART_ITEMS}/${cartItemId}`, quantity);

  if (!result.ok) {
    throw new Error('장바구니에서 상품 수량을 수정하는데 실패했습니다');
  }
};

export default patchCartItem;
