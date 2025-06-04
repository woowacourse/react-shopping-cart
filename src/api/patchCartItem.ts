import { URLS } from '../constants/url';
import { httpClient } from './httpClient';

const patchCartItem = async (cartItemId: number, quantity: number) => {
  const result = await httpClient.patch(`${URLS.CART_ITEMS}/${cartItemId}`, quantity);

  if (!result.ok) {
    throw new Error('장바구니에서 상품 수량을 수정하는데 실패했습니다');
  }
};

export default patchCartItem;
