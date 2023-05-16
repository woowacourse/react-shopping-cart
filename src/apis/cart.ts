import { CartItem } from '../types/cart';

interface FetchCartRes {
  cart: CartItem[];
}

export const fetchCart: () => Promise<FetchCartRes> = async () => {
  try {
    const res = await fetch('./data/mockCart.json');
    const data = res.json();
    return data;
  } catch {
    throw new Error('장바구니 목록을 불러오지 못했습니다.');
  }
};
