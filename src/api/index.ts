import { ENV, ERROR_MESSAGES, PAGINATION, PATHS } from "../constants";
import { CartItem, CartItemCounts } from "../types";
import { getAuthHeaders, handleResponse } from "../utils/api";

// POST : /cart-items 사용자의 장바구니에 아이템 추가
export async function postAddCartItem(productId: number): Promise<void> {
  const response = await fetch(`${ENV.API_URL}${PATHS.CART_ITEMS}`, {
    method: "POST",
    headers: getAuthHeaders(true),
    body: JSON.stringify({ productId }),
  });

  await handleResponse(response, ERROR_MESSAGES.ADD_CART_ITEM, false);
}

// GET : /cart-items 사용자의 장바구니 목록 조회
export async function getCartItems(
  page: number = PAGINATION.DEFAULT_PAGE,
  size: number = PAGINATION.ITEM_LIMIT_PER_PAGE
): Promise<CartItem[]> {
  const response = await fetch(`${ENV.API_URL}${PATHS.CART_ITEMS}?page=${page}&size=${size}`, {
    method: "GET",
    headers: getAuthHeaders(false),
  });

  const data = await handleResponse(response, ERROR_MESSAGES.FETCH_CART_ITEMS);
  return data.content;
}

// GET : /cart-items/counts 장바구니 아이템 수량 조회
export async function getCartItemCounts(): Promise<CartItemCounts> {
  const response = await fetch(`${ENV.API_URL}${PATHS.CART_ITEMS}${PATHS.COUNTS}`, {
    method: "GET",
    headers: getAuthHeaders(false),
  });

  return await handleResponse(response, ERROR_MESSAGES.FETCH_CART_ITEM_COUNTS);
}

// PATCH : /cart-items/{id} 장바구니 아이템 수량 변경
export async function patchCartItemQuantityChange(
  cartItemId: number,
  quantity: number
): Promise<void> {
  const response = await fetch(`${ENV.API_URL}${PATHS.CART_ITEMS}/${cartItemId}`, {
    method: "PATCH",
    headers: getAuthHeaders(true),
    body: JSON.stringify({ quantity }),
  });

  await handleResponse(response, ERROR_MESSAGES.FETCH_CART_ITEM_QUANTITY, false);
}

// DELETE : /cart-items/{id} 장바구니 아이템 삭제
export async function deleteCartItem(cartItemId: number): Promise<void> {
  const response = await fetch(`${ENV.API_URL}${PATHS.CART_ITEMS}/${cartItemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(false),
  });

  await handleResponse(response, ERROR_MESSAGES.DELETE_CART_ITEM, false);
}

// GET : /coupons 쿠폰 목록 조회
export async function getCoupons() {
  const response = await fetch(`${ENV.API_URL}${PATHS.COUPONS}`, {
    method: "GET",
    headers: getAuthHeaders(false),
  });
  return await handleResponse(response, ERROR_MESSAGES.FETCH_COUPONS);
}
