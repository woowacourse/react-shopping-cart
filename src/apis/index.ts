import { generateBasicToken } from "@/utils/auth";

import { CartItem } from "@/types/cart";

const API_URL = import.meta.env.VITE_API_URL;
const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface APIOptions {
  method: HttpMethod;
  headers?: HeadersInit;
  body?: object;
}

const cartAPIClient = async (endPoint: string, apiOptions: APIOptions) => {
  const { method, headers, body } = apiOptions;

  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}${endPoint}`, {
    method: method,
    headers: { Authorization: token, ...headers },
    body: body ? JSON.stringify(body) : null,
  });

  return response;
};

export const getCartItems = async (): Promise<CartItem[]> => {
  const response = await cartAPIClient("/cart-items", { method: "GET" });

  if (!response.ok) {
    throw new Error(
      "장바구니 데이터를 불러올 수 없습니다. 나중에 다시 시도해 주세요."
    );
  }

  const data = await response.json();
  return data.content;
};

export const patchCartItemQuantity = async (
  cartItemId: number,
  quantity: number
): Promise<boolean> => {
  const response = await cartAPIClient(`/cart-items/${cartItemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: { quantity },
  });

  if (!response.ok) {
    throw new Error("상품 수량 변경에 실패했습니다. 나중에 다시 시도해 주세요");
  }

  return response.ok;
};

export const removeCartItem = async (cartItemId: number): Promise<boolean> => {
  const response = await cartAPIClient(`/cart-items/${cartItemId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("아이템을 삭제할 수 없습니다. 나중에 다시 시도해 주세요.");
  }

  return response.ok;
};
