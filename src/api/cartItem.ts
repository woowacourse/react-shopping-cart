import SERVER_URL from "../config/serverUrl";
import { CartItemResponse } from "../types/ShoppingCart";
import { generateBasicToken } from "../utils/auth";

async function requestServer<T = void>(path: string, method: string, bodyData?: any): Promise<T> {
  const token = generateBasicToken(SERVER_URL.userId, SERVER_URL.userPassword);
  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
  };

  const options: RequestInit = { method, headers, ...(bodyData && { body: JSON.stringify(bodyData) }) };

  const response = await fetch(`${SERVER_URL.apiUrl}${path}`, options);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return method !== "DELETE" ? response.json() : null;
}

export async function fetchCartItems(): Promise<CartItemResponse[]> {
  const data = await requestServer<{ content: CartItemResponse[] }>("/cart-items", "GET");
  return data.content;
}

export async function patchCartItemQuantity(itemId: number, quantity: number): Promise<void> {
  await requestServer(`/cart-items/${itemId}`, "PATCH", { quantity });
}

export async function deleteCartItem(itemId: number): Promise<void> {
  await requestServer(`/cart-items/${itemId}`, "DELETE");
}
