import { generateBasicToken } from "../utils/auth";
import { API_URL, USER_ID, USER_PASSWORD } from "../constants/cart";
import { CartItemType } from "../types/cart";

export const getCartItems = async (): Promise<CartItemType[]> => {
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

export const patchCartItemQuantity = async (id: number, quantity: number) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${id}`, {
    method: "PATCH",
    headers: { Authorization: token, "Content-type": "application/json" },
    body: JSON.stringify({
      quantity,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to patch cart item quantity");
  }
};

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
