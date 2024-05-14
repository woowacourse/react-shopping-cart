import { Product } from "../types";
import { generateBasicToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL as string;
const USER_ID = import.meta.env.VITE_USER_ID as string;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD as string;
const BASE_URL = `${API_URL}/cart-items`;

export async function fetchCartItems(): Promise<Product[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(BASE_URL, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch CartItems");
  }

  const data = await response.json();
  return data.content;
}

export async function addCartItem(productId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error("Failed to add cart item");
  }
}

export async function deleteCartItem(productId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${BASE_URL}/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete cart item");
  }
}

export async function changeCartItemQuantity(addToCartId: number, quantity: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  console.log("quantity fetch함수내부:", JSON.stringify({ quantity }));
  const response = await fetch(`${BASE_URL}/${addToCartId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error("Failed to change cart item quantity");
  }
}

export async function fetchCartItemsCounts(): Promise<number> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${BASE_URL}/counts`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch CartItems Counts");
  }

  const data = await response.json();
  return data.quantity;
}
