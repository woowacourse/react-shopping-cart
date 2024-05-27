import { generateBasicToken } from './utils/auth';
import { CartItemType } from '../types';

const API_URL = process.env.API_URL;
const USER_ID = process.env.USER_ID;
const USER_PASSWORD = process.env.USER_PASSWORD;

/**
 * 공통 요청을 처리하는 함수
 * @param {string} endpoint - API endpoint
 * @param {RequestInit} options - fetch options
 * @returns {Response} - fetch response
 */
async function makeRequest(endpoint: string, options: RequestInit): Promise<Response> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to ${options.method?.toLowerCase()} ${endpoint}`);
  }

  return response;
}

/**
 * fetchCartItems - API에서 카트의 상품들을 fetch하는 비동기 함수입니다.
 * @returns {Promise<CartItemType[]>}
 */
export async function fetchCartItems(): Promise<CartItemType[]> {
  const response = await makeRequest('/cart-items', { method: 'GET' });
  const data = await response.json();
  return data.content;
}

/**
 * addCartItem - 카트에 상품을 추가합니다.
 * @returns
 */
export async function addCartItem(id: number) {
  const response = await makeRequest('/cart-items', {
    method: 'POST',
    body: JSON.stringify({ cartItemIds: id }),
  });

  return { success: response.ok };
}

/**
 * updateCartItemQuantity - API에 카트 상품의 quantity를 업데이트 요청하는 함수입니다.
 * @param {number} id - quantity를 업데이트할 상품의 Id
 * @param {number} newQuantity - 업데이트할 상품의 quantity
 * @returns {boolean} - fetch의 성공 여부입니다.
 */
export async function updateCartItemQuantity(id: number, newQuantity: number) {
  const response = await makeRequest(`/cart-items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity: newQuantity }),
  });

  return { success: response.ok };
}

/**
 * deleteCartItem - API에 카트에서 해당 id의 상품을 삭제 요청하는 함수입니다.
 * @param {number} id - 카트에서 삭제할 상품의 id
 * @returns {boolean} - fetch의 성공 여부입니다.
 */
export async function deleteCartItem(id: number) {
  const response = await makeRequest(`/cart-items/${id}`, {
    method: 'DELETE',
  });

  return { success: response.ok };
}

/**
 * addOrders - API에 주문을 추가하는 함수입니다.
 * @param {number[]} ids - 주문할 상품들의 id 배열
 * @returns {boolean} - fetch의 성공 여부입니다.
 */
export async function addOrders(ids: number[]) {
  const response = await makeRequest('/orders', {
    method: 'POST',
    body: JSON.stringify({ cartItemIds: ids }),
  });

  return { success: response.ok };
}

/**
 * fetchCoupons - API에서 쿠폰 목록을 가져옵니다.
 * @returns {Promise<CartItemType[]>}
 */
export async function fetchCoupons() {
  const response = await makeRequest('/coupons', {
    method: 'GET',
  });
  const data = await response.json();

  return data;
}
