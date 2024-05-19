import { BASE_URL, USER_ID, USER_PASSWORD } from '.';
import { CartItemType } from '../type';
import { generateBasicToken } from './auth';

export const fetchCartItems = async (): Promise<CartItemType[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${BASE_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('장바구니 정보 불러오기를 실패했습니다.');
  }

  const data = await response.json();
  return data.content;
};

export const removeCartItem = async (cartItemId: number): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${BASE_URL}/cart-items/${cartItemId}`, {
    method: 'DELETE',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('장바구니 아이템 삭제를 실패했습니다.');
  }
};

export const adjustCartItemQuantity = async (
  cartItemId: number,
  quantity: number,
): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${BASE_URL}/cart-items/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('장바구니 아이템 수령 변경을 실패했습니다.');
  }
};
