import SERVER_URL from "../config/serverUrl";
import { CouponType } from "../types/Coupon";
import { CartItemResponse } from "../types/ShoppingCart";
import { generateBasicToken } from "../utils/auth";

export async function fetchCartItems(): Promise<CartItemResponse[]> {
  const token = generateBasicToken(SERVER_URL.userId, SERVER_URL.userPassword);

  try {
    const response = await fetch(`${SERVER_URL.apiUrl}/cart-items`, {
      method: "GET",
      headers: { Authorization: token },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function patchCartItemQuantity(itemId: number, quantity: number): Promise<void> {
  const token = generateBasicToken(SERVER_URL.userId, SERVER_URL.userPassword);
  const bodyData = {
    quantity,
  };

  const response = await fetch(`${SERVER_URL.apiUrl}/cart-items/${itemId}`, {
    method: "PATCH",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }
}

export async function deleteCartItem(itemId: number): Promise<void> {
  const token = generateBasicToken(SERVER_URL.userId, SERVER_URL.userPassword);

  const response = await fetch(`${SERVER_URL.apiUrl}/cart-items/${itemId}`, {
    method: "DELETE",
    headers: { Authorization: token, "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }
}

export async function fetchCoupons(): Promise<CouponType[]> {
  const token = generateBasicToken(SERVER_URL.userId, SERVER_URL.userPassword);

  const response = await fetch(`${SERVER_URL.apiUrl}/coupons`, {
    method: "get",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch coupons");
  }

  const data = await response.json();
  return data;
}

export async function postOrders(cartItemIds: number[]): Promise<Pick<Response, "status">> {
  const token = generateBasicToken(SERVER_URL.userId, SERVER_URL.userPassword);

  const bodyData = {
    cartItemIds,
  };

  const response = await fetch(`${SERVER_URL.apiUrl}/orders`, {
    method: "post",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) {
    throw new Error("Failed to post order");
  }

  return response;
}
