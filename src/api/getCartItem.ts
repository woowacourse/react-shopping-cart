import { CartItemResponse } from '../types/response';
import { URLS } from '../constants/url';

const getCartItems = async (): Promise<CartItemResponse> => {
  const res = await fetch(URLS.CART_ITEMS, {
    headers: {
      Authorization: `Basic ${btoa(`${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`)}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('장바구니 데이터를 불러오는 데 실패했습니다.');
  }

  return res.json();
};

export default getCartItems;
