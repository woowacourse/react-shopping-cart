import { CartItem } from "../types/cartItems";
import { generateBasicToken } from "../utils/generateBasicToken";

const API_URL = import.meta.env.VITE_API_URL as string;
const USERNAME = import.meta.env.VITE_USERNAME as string;
const USER_PASSWORD = import.meta.env.VITE_PASSWORD as string;

if (!API_URL || !USERNAME || !USER_PASSWORD) {
  throw new Error("API_URL, USERNAME, PASSWORD environment variables are not set");
}

const PATH = {
  cartItems: "/cart-items",
};

export const fetchCartItems = async (): Promise<CartItem[]> => {
  const token = generateBasicToken(USERNAME, USER_PASSWORD);
  const response = await fetch(`${API_URL}${PATH.cartItems}`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }

  const data = await response.json();
  return data.content;
};

export const updateCartItemQuantity = async (
  cartItemId: number,
  quantity: number
): Promise<void> => {
  const token = generateBasicToken(USERNAME, USER_PASSWORD);
  const response = await fetch(`${API_URL}${PATH.cartItems}/${cartItemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error("Failed to update cart item quantity");
  }
};

export const removeCartItem = async (cartItemId: number): Promise<void> => {
  const token = generateBasicToken(USERNAME, USER_PASSWORD);
  const response = await fetch(`${API_URL}${PATH.cartItems}/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove cart item");
  }
};

export const createCartItem = async (productId: number): Promise<void> => {
  const token = generateBasicToken(USERNAME, USER_PASSWORD);
  const response = await fetch(`${API_URL}${PATH.cartItems}`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error("Failed to create cart item");
  }
};
