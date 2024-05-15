import { CartItem } from '../type';
import { generateBasicToken } from './auth';

const BASE_URL = import.meta.env.VITE_API_URL;
const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

export const fetchCartItem = async (): Promise<CartItem[]> => {
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
