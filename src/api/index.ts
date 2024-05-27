import { Coupon } from '../types/Coupon';
import { Items } from '../types/Item';
import { FetchResponseType } from '../types/api';
import { generateBasicToken } from '../utils/Auth';

const API_URL = process.env.VITE_API_URL ?? 'undefined';

const USER_ID = process.env.VITE_USER_ID ?? 'undefined';
const USER_PASSWORD = process.env.VITE_USER_PASSWORD ?? 'undefined';

const token = generateBasicToken(USER_ID, USER_PASSWORD);
const fetchResponse = async ({
  url,
  method,
  body = null,
}: FetchResponseType) => {
  const response = await fetch(`${API_URL}${url}`, {
    method: method,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body,
  });

  return response;
};

export async function fetchItems(): Promise<Items[]> {
  const response = await fetchResponse({
    url: '/cart-items',
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('목록을 불러오는데 실패하였습니다. 다시 시도해 주세요.');
  }

  const data = await response.json();
  return data.content;
}

export async function fetchCartItemQuantity(
  cartItemId: number,
  quantity: number,
): Promise<void> {
  const response = await fetchResponse({
    url: `/cart-items/${cartItemId}`,
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('수량 업데이트에 실패하였습니다. 다시 시도해 주세요.');
  }
}

export async function removeCartItem(cartItemId: number): Promise<void> {
  const response = await fetchResponse({
    url: `/cart-items/${cartItemId}`,
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(
      '장바구니 목록을 불러오는데 실패하였습니다. 다시 시도해 주세요.',
    );
  }
}

export async function fetchCoupons(): Promise<Coupon[]> {
  const response = await fetchResponse({
    url: '/coupons',
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('쿠폰을 불러오는데 실패하였습니다. 다시 시도해 주세요.');
  }

  const data = await response.json();
  return data;
}

export async function fetchOrder(orderItems: Items[]): Promise<void> {
  const response = await fetchResponse({
    url: '/orders',
    method: 'POST',
    body: JSON.stringify({ cartItemIds: orderItems.map((item) => item.id) }),
  });

  if (!response.ok) {
    throw new Error('주문 생성에 실패하였습니다. 다시 시도해 주세요.');
  }
}

export async function addNike(): Promise<void> {
  const response = await fetchResponse({
    url: '/cart-items',
    method: 'POST',
    body: JSON.stringify({ productId: 2, quantity: 1 }),
  });

  if (!response.ok) {
    throw new Error('상품 추가에 실패하였습니다. 다시 시도해 주세요.');
  }
}

export async function addAdidas(): Promise<void> {
  const response = await fetchResponse({
    url: '/cart-items',
    method: 'POST',
    body: JSON.stringify({ productId: 3, quantity: 1 }),
  });

  if (!response.ok) {
    throw new Error('상품 추가에 실패하였습니다. 다시 시도해 주세요.');
  }
}

export async function addCoke(): Promise<void> {
  const response = await fetchResponse({
    url: '/cart-items',
    method: 'POST',
    body: JSON.stringify({ productId: 34, quantity: 1 }),
  });

  if (!response.ok) {
    throw new Error('상품 추가에 실패하였습니다. 다시 시도해 주세요.');
  }
}
