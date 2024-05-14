import { generateBasicToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL;
const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

/**
 * 사용자의 장바구니 목록 조회
 */
export const getCartItems = async () => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to get cart items");
  }

  const data = await response.json();
  return data.content;
};

/**
 * 장바구니 아이템 삭제
 */
export const deleteCartItem = async (id: number) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to delete cart item");
  }
};

/**
 * 장바구니 아이템 수량 변경
 */
export const patchCartItemQuantity = async (id: number, quantity: number) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-item/${id}`, {
    method: "PATCH",
    headers: { Authorization: token },
    body: JSON.stringify({
      quantity,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to patch cart item quantity");
  }
};

/**
 * 장바구니 아이템 수량 조회
 */
export const getCartItemQuantity = async () => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/counts`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to get cart item quantity");
  }

  const data = await response.json();
  return data.quantity;
};
