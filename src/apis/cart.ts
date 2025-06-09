import { CartProduct } from '../types/cart';
import handleHttpError from '../utils/handleHTTPError';
import { BASE_URL } from './env';
import { CART_HEADER } from './options';

export const getCartItems = async (page = 0, size = 20) => {
  try {
    const response = await fetch(`${BASE_URL}/cart-items?page=${page}&size=${size}`, {
      headers: CART_HEADER,
    });

    if (!response.ok) {
      handleHttpError(response);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('장바구니 목록을 불러오는 중 에러 발생');
  }
};

export const patchIncreaseQuantity = async (cartItem: CartProduct) => {
  try {
    const response = await fetch(`${BASE_URL}/cart-items/${cartItem.id}`, {
      method: 'PATCH',
      headers: CART_HEADER,
      body: JSON.stringify({
        quantity: cartItem.quantity + 1,
      }),
    });
    if (!response.ok) {
      handleHttpError(response);
    }
  } catch (error) {
    throw new Error('장바구니 상품 증가시 오류 발생');
  }
};

export const patchDecreaseQuantity = async (cartItem: CartProduct) => {
  try {
    const response = await fetch(`${BASE_URL}/cart-items/${cartItem.id}`, {
      method: 'PATCH',
      headers: CART_HEADER,
      body: JSON.stringify({
        quantity: cartItem.quantity - 1,
      }),
    });
    if (!response.ok) {
      handleHttpError(response);
    }
  } catch (error) {
    throw new Error('장바구니 상품 감소시 오류 발생');
  }
};

export const removeCartItem = async (cartItem: CartProduct) => {
  try {
    const response = await fetch(`${BASE_URL}/cart-items/${cartItem.id}`, {
      method: 'DELETE',
      headers: CART_HEADER,
    });
    if (!response.ok) {
      handleHttpError(response);
    }
  } catch (error) {
    throw new Error('장바구니 상품 삭제시 오류 발생');
  }
};

export const getCoupons = async () => {
  try {
    const response = await fetch(`${BASE_URL}/coupons`, {
      method: 'GET',
      headers: CART_HEADER,
    });
    if (!response.ok) {
      handleHttpError(response);
    }
    return await response.json();
  } catch (error) {
    throw new Error('쿠폰 목록을 불러오는 중 에러 발생');
  }
};
