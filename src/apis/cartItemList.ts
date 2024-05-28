import { generateBasicToken } from '../utils/auth';
import convertCartItem from '../utils/convertCartItem';

const API_URL = process.env.VITE_API_URL ?? 'undefined_URL';
const USER_ID = process.env.VITE_API_USER_ID ?? 'undefined_USER_ID';
const USER_PASSWORD =
  process.env.VITE_API_USER_PASSWORD ?? 'undefined_USER_PASSWORD';

export const requestCartItemList = async () => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products:');
  }
  const data = await response.json();

  return convertCartItem(data.content);
};

export const requestSetCartItemQuantity = async (
  cartItemId: number,
  quantity: number,
) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'PATCH',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quantity,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to setCartItemQuantity');
  }
};

export const requestDeleteCartItem = async (cartItemId: number) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'DELETE',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: cartItemId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to deleteCartItem');
  }
};

// TEST를 위한 cartItem추가 API 실행
export const requestAddCartItemForTest = async (cartItemId: number) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: cartItemId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to addCartItem');
  }
};
