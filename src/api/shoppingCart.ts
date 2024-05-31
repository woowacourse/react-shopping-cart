import { BASE_URL, USER_ID, USER_PASSWORD } from '.';
import { CartItemType } from '../type';
import { generateBasicToken } from './util/auth';

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

export const removeCartItem = async (cartItemId: number) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  try {
    const response = await fetch(`${BASE_URL}/cart-items/${cartItemId}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    });

    if (!response.ok) {
      throw new Error('장바구니 아이템 삭제를 실패했습니다.');
    }

    return response.ok;
  } catch (error) {
    throw new Error(
      '🚨네트워크 요청 중 오류가 발생했습니다🚨 \n 연결 확인 후 다시 시도해주세요🙇',
    );
  }
};

export const adjustCartItemQuantity = async (
  cartItemId: number,
  quantity: number,
) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  try {
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

    return response.ok;
  } catch (error) {
    throw new Error(
      '🚨네트워크 요청 중 오류가 발생했습니다🚨 \n 연결 확인 후 다시 시도해주세요🙇',
    );
  }
};

export const orderCartItem = async (cartItemId: number[]) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartItemIds: [...cartItemId],
      }),
    });

    if (!response.ok) {
      throw new Error('주문에 실패했습니다.');
    }

    return response.ok;
  } catch (error) {
    throw new Error(
      '🚨네트워크 요청 중 오류가 발생했습니다🚨 \n 연결 확인 후 다시 시도해주세요🙇',
    );
  }
};
