import { BASE_URL, USER_TOKEN } from './env';

export const getCartItems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cart-items?page=0&size=20`, {
      headers: {
        Authorization: `Basic ${USER_TOKEN}`,
        'content-type': 'application/json',
      },
    });
    const data = await response.json();

    return data.content;
  } catch (error) {
    throw new Error('장바구니 목록을 불러오는 중 에러 발생');
  }
};
