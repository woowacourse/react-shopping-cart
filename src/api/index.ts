import { ENV, ERROR_MESSAGES, PAGINATION, PATHS } from "../constants";
import { CartItem, CartItemCounts } from "../types";
import { generateBasicToken } from "../utils/auth";

// POST : /cart-items 사용자의 장바구니에 아이템 추가
export async function postAddCartItem(productId: number): Promise<void> {
  const token = generateBasicToken(ENV.USER_ID, ENV.USER_PASSWORD);
  const response = await fetch(`${ENV.API_URL}${PATHS.CART_ITEMS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.ADD_CART_ITEM);
  }
}

// GET : /cart-items 사용자의 장바구니 목록 조회
export async function getCartItems(
  page: number = PAGINATION.DEFAULT_PAGE,
  size: number = PAGINATION.ITEM_LIMIT_PER_PAGE
): Promise<CartItem[]> {
  const token = generateBasicToken(ENV.USER_ID, ENV.USER_PASSWORD);
  const response = await fetch(`${ENV.API_URL}${PATHS.CART_ITEMS}?page=${page}&size=${size}`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_CART_ITEMS);
  }

  const data = await response.json();
  return data.content;
}

// GET : /cart-items/counts 장바구니 아이템 수량 조회
export async function getCartItemCounts(): Promise<CartItemCounts> {
  const token = generateBasicToken(ENV.USER_ID, ENV.USER_PASSWORD);
  const response = await fetch(`${ENV.API_URL}${PATHS.CART_ITEMS}${PATHS.COUNTS}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_CART_ITEM_COUNTS);
  }

  const data = await response.json();
  return data;
}

// PATCH : /cart-items/{id} 장바구니 아이템 수량 변경
export async function patchCartItemQuantityChange(
  cartItemId: number,
  quantity: number
): Promise<void> {
  const token = generateBasicToken(ENV.USER_ID, ENV.USER_PASSWORD);
  const response = await fetch(`${ENV.API_URL}${PATHS.CART_ITEMS}/${cartItemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_CART_ITEM_QUANTITY);
  }
}

// DELETE : /cart-items/{id} 장바구니 아이템 삭제
export async function deleteCartItem(cartItemId: number): Promise<void> {
  const token = generateBasicToken(ENV.USER_ID, ENV.USER_PASSWORD);
  const response = await fetch(`${ENV.API_URL}${PATHS.CART_ITEMS}/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.DELETE_CART_ITEM);
  }
}
