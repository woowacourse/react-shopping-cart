import { CartProduct } from '../types/cart';
import { BASE_URL, USER_TOKEN } from './env';

export const getCartItems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cart-items?page=0&size=20`, {
      headers: {
        Authorization: `Basic ${USER_TOKEN}`,
        'content-type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error('장바구니 목록을 불러오는 중 에러 발생');
  }
};

export const patchIncreaseQuantity = async (cartItem: CartProduct) => {
  try {
    await fetch(`${BASE_URL}/cart-items/${cartItem.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Basic ${USER_TOKEN}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        quantity: cartItem.quantity + 1,
      }),
    });
  } catch (error) {
    throw new Error('장바구니 상품 증가시 오류 발생');
  }
};

export const patchDecreaseQuantity = async (cartItem: CartProduct) => {
  try {
    await fetch(`${BASE_URL}/cart-items/${cartItem.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Basic ${USER_TOKEN}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        quantity: cartItem.quantity - 1,
      }),
    });
  } catch (error) {
    throw new Error('장바구니 상품 감소시 오류 발생');
  }
};

export const removeCartItem = async (cartItem: CartProduct) => {
  try {
    await fetch(`${BASE_URL}/cart-items/${cartItem.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${USER_TOKEN}`,
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('장바구니 상품 삭제시 오류 발생');
  }
};
