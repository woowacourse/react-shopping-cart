import { generateBasicToken } from './utils/auth';
import { CartItemData } from '@/types';
import Fetcher from './Fetcher';
import { API_ROUTES } from '@/constants/routes';
import { ERROR_MESSAGE } from '@/constants/messages';
import HttpError from '@/error/HttpError';

// const API_URL = import.meta.env.VITE_API_URL;
// const USER_ID = import.meta.env.VITE_USER_ID;
// const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

const API_URL = process.env.API_URL;
const USER_ID = process.env.USER_ID;
const USER_PASSWORD = process.env.USER_PASSWORD;

interface CartItemsResponse {
  content: CartItemData[];
}

export async function fetchCartItems(): Promise<CartItemData[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const data = await Fetcher.get<CartItemsResponse>(`${API_URL}${API_ROUTES.CART}`, {
    headers: { Authorization: token },
  });

  return data.content;
}

export async function updateCartItemQuantity(id: number, newQuantity: number) {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  try {
    await Fetcher.patch(`${API_URL}${API_ROUTES.CART}/${id}`, {
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQuantity }),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(`${ERROR_MESSAGE.FAIL_UPDATE_QUANTITY} ${error.message}`, 400);
    }
  }
}

export async function deleteCartItem(id: number) {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  try {
    await Fetcher.delete(`${API_URL}${API_ROUTES.CART}/${id}`, {
      headers: { Authorization: token, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(`${ERROR_MESSAGE.FAIL_DELETE_ITEM}${error.message}`, 400);
    }
  }
}

export async function getAllCoupons() {
  const data = Fetcher.get(`${API_URL}/coupons`);

  return data;
}
