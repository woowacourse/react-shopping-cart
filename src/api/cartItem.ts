import SERVER_URL from "../config/serverUrl";
import { CartItemResponse } from "../types/ShoppingCart";
import { generateBasicToken } from "../utils/auth";

export async function fetchCartItems(): Promise<CartItemResponse[]> {
  const token = generateBasicToken(SERVER_URL.userId, SERVER_URL.userPassword);
  const response = await fetch(`${SERVER_URL.apiUrl}/cart-items`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }

  const data = await response.json();
  return data.content;
}
