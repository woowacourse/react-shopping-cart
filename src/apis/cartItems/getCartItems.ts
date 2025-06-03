import { CartItemType } from '@/apis/cartItems/cartItem.type';
import { httpClient } from '../httpClient';

const ERROR_MESSAGE = '징바구니를 가져오는 데 실패했습니다.';

export const getCartItems = async (): Promise<CartItemType[]> => {
  const url = new URLSearchParams({
    page: '0',
    size: '50',
    sort: 'asc', // 현재 요구사항 정렬 기준이 없으므로 기본값으로 설정
  });

  const response = await httpClient.get(`/cart-items?${url.toString()}`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }

  const data = await response.json();
  return data.content;
};
