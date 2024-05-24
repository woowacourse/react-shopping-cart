import type { TCartItem } from '../types/CartItem.type';
import type { Coupon } from '../types/Coupon.type';
import { generateBasicToken } from '../utils/auth';
import { CART_ITEM_ERROR_MESSAGE } from '../constants/MESSAGES';

const API_URL = import.meta.env.VITE_API_URL;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
const USER_ID = import.meta.env.VITE_USER_ID;

export const fetchCartItemList = async (): Promise<TCartItem[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error(CART_ITEM_ERROR_MESSAGE.FETCH);
  }

  const data = await response.json();

  return data.content;
};

export const fetchCoupons = async (): Promise<Coupon[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/coupons`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('쿠폰을 불러오던 중 문제가 발생했습니다.');
  }

  const data = await response.json();

  return data;
};

export const addOrder = async (cartItems: TCartItem[]): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ cartItemIds: cartItems.map((item) => item.id) }),
  });

  if (!response.ok) {
    throw new Error('주문을 생성하던 중 문제가 발생했습니다.');
  }
};

export const addCartItem = async (cartItemId: number): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ id: cartItemId }),
  });

  if (!response.ok) {
    throw new Error(CART_ITEM_ERROR_MESSAGE.ADD);
  }
};

export const removeCartItem = async (cartItemId: number): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'DELETE',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error(CART_ITEM_ERROR_MESSAGE.REMOVE);
  }
};

export const updateCartItemQuantity = async (cartItemId: number, quantity: number): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ quantity: quantity }),
  });

  if (!response.ok) {
    throw new Error(CART_ITEM_ERROR_MESSAGE.UPDATE);
  }
};
