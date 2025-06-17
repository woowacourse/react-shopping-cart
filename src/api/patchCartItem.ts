import { API_END_POINTS } from '../constants/apiEndPoint';
import { httpClient } from './httpClient';

const patchCartItem = async (cartItemId: number, quantity: number) => {
  const result = await httpClient.patch(`${API_END_POINTS.CART_ITEMS}/${cartItemId}`, quantity);

  if (!result.ok) {
    throw new Error('장바구니에서 상품 수량을 수정하는데 실패했습니다');
  }
};

export default patchCartItem;
