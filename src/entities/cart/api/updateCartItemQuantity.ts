import { UpdateCartItemQuantity } from '@entities/cart/type/cartItem.type';
import { httpClient } from '@shared/api/httpClient';

const ERROR_MESSAGE = '장바구니 상품 수량을 업데이트하는 데 실패했습니다.';

export const updateCartItemQuantity = async ({ id, quantity }: UpdateCartItemQuantity) => {
  const response = await httpClient.patch(`/cart-items/${id}`, { quantity });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData.message);
    throw new Error(ERROR_MESSAGE);
  }
};
